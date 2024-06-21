// ? before adding (correcting) Edit Previous List functionality

document.addEventListener("DOMContentLoaded", function()
{

    let listItems = ['T-shirt','Toothbrush', 'Trimmer', 'Shoes', 'Laptop', 'Charger', 'Powerbank', 'Blanket'];
    let imageUrls = ['static/t-shirt.png','static/toothbrush.png', 'static/trimmer.png', 'static/shoes.png', 'static/laptop.png',
        'static/charger.png','static/powerbank.png', 'static/blanket.png'];

    let listNames = []; // !

    // create dict (Object)
    let itemImgDict = {};
    if (listItems.length === imageUrls.length) {
        for (let i = 0; i < listItems.length; i++)
        {
            itemImgDict[listItems[i]] = imageUrls[i];   
        }
    }

    else
    {
        console.error("The length of list_items and URLs don't match")
    }


    // function to append a list of child elements to a target div
    function appendToParent(list, target)
    {
        // target.innerHTML = ""; // clear the target area

        list.forEach(curr_item => {

            const list_item = document.createElement("div");
            list_item.className = "list";
            list_item.draggable = true;

            let img = document.createElement("img");
            img.src = itemImgDict[curr_item];
            img.alt = curr_item;
            list_item.appendChild(img);

            let text = document.createTextNode(curr_item)
            list_item.appendChild(text);

            target.appendChild(list_item);

        });
    }


    // Define event handlers for drag-n-drop
    function handleDragStart(event) {
        dragged = event.target;
        event.target.classList.add('dragging');
    }

    function handleDragEnd(event) {
        event.target.classList.remove('dragging');
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDropAdd(event) {
        event.preventDefault();
        // Ensure we're dropping in the correct container
        if (event.target.id === 'drop_zone') {
            event.target.appendChild(dragged);

            // -------------------- SQL part -------------------- // 
            
            const data = { name: dragged.textContent.trim(), list_num: listNum };  // trim() - to remove leading whitespace

            fetch('/add_item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error(error);
            });

        }
    }

    function handleDropRemove(event) {
        event.preventDefault();
        // Ensure we're dropping in the correct container
        if (event.target.classList.contains('sidebar')) 
        {
            event.target.appendChild(dragged);
        }

        // -------------------- SQL part -------------------- // 
            
        const data = { name: dragged.textContent.trim(), list_num: listNum };  // trim() - to remove leading whitespace

        fetch('/remove_item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        // .then(responseData => {
        //     console.log(responseData);   
        // })
        .catch(error => {
            console.error(error);
        });

    }


    // #################### Function to add drag-n-drop powers #################### //

    function addDragAndDropListeners()
    {
        let dragged;

        const dropZone = document.getElementById("drop_zone");
        const sidebar = document.querySelector(".sidebar");


        // event fired on the draggable target
        document.querySelectorAll('.sidebar .list').forEach(item => {

            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd);
        });

        // event fired on the drop targets
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('drop', handleDropAdd);

        // ***************************** Reverse operation ***************************** //

        document.querySelectorAll('#drop_zone .list').forEach(item => {
            
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd)
        });
        
        // event fired on the drop targets
        sidebar.addEventListener('dragover', handleDragOver);
        sidebar.addEventListener('drop', handleDropRemove);

    }
    // ======================================================================== //
    // ============================= FIN function ============================= //
    // ======================================================================== //

    // Remove event listeners from old elements
    function removeEventListeners()
    {
        document.querySelectorAll('.sidebar.list').forEach(item => {
            item.removeEventListener('dragstart', handleDragStart);
            item.removeEventListener('dragend', handleDragEnd);
        });

        document.querySelectorAll('#drop_zone.list').forEach(item => {
            item.removeEventListener('dragstart', handleDragStart);
            item.removeEventListener('dragend', handleDragEnd);
        });

        sidebar.removeEventListener('dragover', handleDragOver);
        sidebar.removeEventListener('drop', handleDropRemove);

        dropZone.removeEventListener('dragover', handleDragOver);
        dropZone.removeEventListener('drop', handleDropAdd);
        
    }


    // ========================= Print functionality ========================= //

    function printDiv(divName) {
        let printContents = [];
        let list_title = "List";

        // change list title if list is saved with a name
        // if ($('#list-saved').hasClass("listSaved"))  // in vanilla JS, we would use .classList.contains("listSaved")
        // {
            // let name = $('#list-name').val();
        //     console.log(name);
        // }

        const items = document.getElementById(divName).childNodes;
        items.forEach(item => {
            if (item && item.textContent.trim()!== "") {
                printContents.push(item.textContent.trim());
            }
        });

        console.log(printContents);

        let w = window.open();
        w.document.write(`
            <html>
                <head>
                    <style>
                        h1{
                            margin-top: 2cm;
                            margin-bottom: 20px;
                        }

                        body{
                            margin-left: 2cm;

                            display: block;

                            font-size: 20px;
                            font-family: Arial, sans-serif;
                        }

                        .print-item{
                            margin-bottom: 10px
                        }

                        @page {
                            margin: 0;   
                            size: A4;      
                        }

                        input[type="checkbox"]{
                            margin-right: 15px;
                            transform: scale(1.5); /* Make checkbox bigger */
                        }
                    </style>
                </head>
                <body>
        `);
        w.document.writeln("<h1>" + list_title + "</h1>");
        printContents.forEach(content => {
            w.document.write(`<div class="print-item"><input type="checkbox">${content}</div>`);
        });
        w.document.writeln(`
                </body>
            </html>
        `);
        w.document.close();
        w.print();
        w.close();
    }



    const dropZone = document.getElementById("drop_zone");
    const sidebar = document.querySelector(".sidebar");


    // -------------------------------- Create new list -------------------------------- //


    // ----- When Saved, send list name along with list id ----- //

    $('#list-saved').click(function(event) 
        {
            // Make sure Save is pressed before New List
            console.log("Save button clicked");
            event.target.classList.add("listSaved") // Add a class to the button
            newListBtn.disabled = false;

            $('#staticBackdrop').modal('hide'); // hide the modal when Save btn in modal is clicked

            var list_name = document.getElementById("list-name").value;
            if (list_name === "") {
                list_name = "Untitled List";
            }
            
            // ========= Display names in R-sidebar ========= //

            let newListName = document.createElement("div");
            newListName.className = "name";
            let text = document.createTextNode(list_name)
            
            newListName.appendChild(text);
            $('.right_sidebar').append(newListName);


            listNames.push(list_name); // to append name to the list  // !

            console.log("List Name: " + list_name);

            // send data to Flask route to save List name 
            const data = { list_num: listNum, lstName: list_name };
            fetch("/add-list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error(error);
            });

            document.getElementById("list-name").value = ''; // to clear input before next time


            // ======================= Edit previous list when clicked ======================= //

            newListName.addEventListener("click", 
            async function handleListClick() 
            {
                console.log("List name clicked");

                let lst_name = newListName.textContent;
                console.log("List with name:", lst_name,"has been clicked");
                let curr_list = null;

                try 
                {
                    const reponse = await fetch("/show-list", {
                        method: "POST",
                        headers: {"Content-Type": "application/json",},
                        body: JSON.stringify({ lname:lst_name })
                    });
                    if (!reponse.ok) {
                        throw new Error("Network response was not OK");
                    }
                    resp = await reponse.json(); // this is the response, containing the list 
                }

                catch(error) {
                    console.error("There was a prob during the Fetch operation", error);
                }

                console.log("Response from show-list ->", resp);
                lst_id = resp["list_id"];
                curr_list = resp["response_lst"];
                
                // clear dropzone and sidebar
                dropZone.innerHTML = "";
                sidebar.innerHTML = "";
                removeEventListeners();
                appendToParent(curr_list, dropZone);

                // the items left, that are not in the selected list (which goes to sidebar)
                let remaining = listItems.filter(item => !curr_list.includes(item));
                appendToParent(remaining, sidebar);
                // addDragAndDropListeners();

            });
        }
    );


    // Reset logic for when New List button is pressed

    newListBtn = document.getElementById("new-list-btn");

    newListBtn.addEventListener("click", () => {
        listNum++; // increment the list Number, to keep track of multiple lists
        console.log("THIS IS LIST " + listNum);

        dropZone.innerHTML = "";
        sidebar.innerHTML = "";

        removeEventListeners();
        appendToParent(listItems, sidebar);
        addDragAndDropListeners();
        
        console.log("Reset complete");

        // disable New List button again
        newListBtn.disabled = true;
    });




    // ** Main prg starts here **

    let listNum = 1;
    appendToParent(listItems, sidebar);
    addDragAndDropListeners();


});







