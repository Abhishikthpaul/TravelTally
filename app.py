from flask import Flask, render_template, request, redirect, request, session, g, jsonify, abort, flash
from flask_session import Session
import sqlite3

from werkzeug.security import check_password_hash, generate_password_hash
from helpers import login_required

# Configure application
app = Flask(__name__)
app.config["DATABASE"] = 'project.db'

# Configure session
app.config["SESSION_PERMANENT"] = False # when close browser data in session will be deleted
app.config["SESSION_TYPE"] = "filesystem" # makes sure your data is stored in server, not cookie
Session(app)

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response
 
### Configure SQLite database -

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(app.config['DATABASE'])
    return db

# close_connection function is registered as a teardown function, 
#   ensuring that the database connection is closed at the end of each request.
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
        




@app.route("/")
@login_required
def index():
    return render_template("index.html")


@app.route("/add_item", methods=["POST"])
@login_required
def add_item():
    data = request.get_json()
    list_num = data["list_num"]
    item_name = data["name"]
    print("List no.-",list_num)
    
    # new lines
    db = get_db()
    cursor = db.cursor()
    # fin
    cursor.execute("INSERT INTO lists (list_id, item) VALUES (?,?)", (list_num, item_name))
    db.commit() # this too
    print('Inserted- ',item_name) 
    return jsonify({'message':'Item created successfully'}), 201


@app.route("/remove_item", methods=["POST"])
@login_required
def remove_item():
    try:
        data = request.get_json()
        item_name = data["name"]
        list_num = data["list_num"]
        print("List no.-",list_num)
        
        # new lines
        db = get_db()
        cursor = db.cursor()
        # fin
        cursor.execute("DELETE FROM lists WHERE list_id = ? AND item = ?", (list_num, item_name))
        db.commit() # this too
    except sqlite3.DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    
    print("Removed-", item_name)
    
    return jsonify({'message':'Item removed successfully'}), 204


# called when list is saved. Saves the list_id along with a 'list name'
@app.route("/add-list", methods=["POST"])
@login_required
def add_table():
    
    data = request.get_json()
    list_id = data['list_num']
    list_name = data['lstName']
    
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO aliases (list_id,list_name) VALUES (?,?)", (list_id,list_name))
        db.commit()
        
    except sqlite3.DatabaseError as e:
        return jsonify({"error": str(e)}), 500
        
    print('Inserted list- ', list_name) 
    return jsonify({'message':'List name saved successfully'}), 201


# show list 
@app.route("/show-list", methods=["POST"])
@login_required
def show_list():
    data = request.get_json()
    lst_name = data["lname"]
    print("Name of list is", lst_name)
    
    # get the table items using SELECT
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT list_id FROM aliases WHERE list_name = ?", (lst_name,))
        row = cursor.fetchone() #use fetchall() for many rows
        if row:
            lst_id = int(row[0])
            print('List id is', lst_id)
        
        cursor.execute("SELECT item FROM lists WHERE list_id = ?", (lst_id,))
        rows = cursor.fetchall()
        cursor.close()
        
        print("Rows-", rows)
        response_list = [row[0] for row in rows]
        print('Items from Select- ', response_list)         
        db.commit()
        
    except sqlite3.DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    
    return jsonify({"list_id": lst_id, "response_lst": response_list})
    

# =========================== Login, logout, Register =========================== #


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            flash("Must provide username", "danger")
            return render_template("login.html")

        # Ensure password was submitted
        elif not request.form.get("password"):
            flash("Must provide password", "danger")
            return render_template("login.html")

        # Query database for username
        db = get_db()
        cursor = db.cursor()
        usrname = request.form.get("username")
        cursor.execute("SELECT * FROM users WHERE username = ?", (usrname,))
        
        row = cursor.fetchone()
        cursor.close()
        print("User saved row-", row)

        # Ensure username exists and password is correct
        if row is None or not check_password_hash(row[2], request.form.get("password")):
            flash("Invalid username and/or password", "danger")
            return render_template("login.html")

        # Remember which user has logged in
        print(row[0], row[2])
        session["user_id"] = row[0]
        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")



@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""

    session.clear()

    if request.method == "GET":
        return render_template("register.html")
    else:
        username = request.form.get("username")
        pwd = request.form.get("password")
        pwd_again = request.form.get("confirmation")

        db = get_db()
        cursor = db.cursor()   
        cursor.execute("SELECT * FROM users WHERE username= ?", (username,))
        check_usrname = cursor.fetchone()

        if not username:
            flash("Must provide username", "danger")
            return render_template("register.html")
        elif check_usrname is not None:
            flash("Username already exists", "danger")
            return render_template("register.html")
        elif not pwd:
            flash("Must provide password", "danger")
            return render_template("register.html")
        elif pwd != pwd_again:
            flash("Passwords are not same", "danger")
            return render_template("register.html")

        hash_pwd = generate_password_hash(pwd)
        if hash_pwd:
            new_user = cursor.execute("INSERT INTO users (username, hash) VALUES (?,?)", (username, hash_pwd))
        
        cursor.close()
        session["user_id"] = new_user  # to create a new session with this user
        
        db.commit()
        
    return redirect("/")


