const addElement = () => {
    const $input = document.getElementById("input"),
    $elementsContainer = document.getElementById("elements"),
    $elementTemplate = document.getElementById("element-template"),
    $element = $elementTemplate.content.cloneNode(true),
    $elements = document.querySelectorAll(".element")

    if(!$input.value) return

    // Edit element
   if ($input.getAttribute("data-id")) {
    const element = $elementsContainer.querySelector(`[data-id = "${$input.getAttribute("data-id")}"]`);
    element.querySelector("#element-text").textContent = $input.value;
     localStorage.setItem($input.getAttribute("data-id"), $input.value);
    $input.setAttribute("data-id", "")
    $input.value = ""
    $input.focus()
   } else {

    //Add new element
   $element.getElementById("element-text").textContent = $input.value;
   $element.querySelector(".element").setAttribute("data-id", $elements.length )
   localStorage.setItem($elements.length, $input.value);


   //Remove element
   $element.querySelector(".btn-delete").addEventListener("click", e => {
       $elementsContainer.removeChild(e.target.parentNode.parentNode);
     localStorage.removeItem(e.target.parentNode.parentNode.getAttribute("data-id"))
    })

    $element.querySelector(".btn-edit").addEventListener("click", e => {
        const element = e.target.parentNode.parentNode.querySelector("#element-text");
        $input.value = element.textContent;
        $input.setAttribute("data-id", element.parentNode.getAttribute("data-id") )
        $input.focus()
    })

    //DOM inserting
    $elementsContainer.append($element)    
    $input.value = ""
    $input.focus()
   }

}

const loadStorage = () => {
    const localstorage = Object.entries(localStorage),
    $elementsContainer = document.getElementById("elements"),
    $elementTemplate = document.getElementById("element-template")
    
    localstorage.forEach( el => { 
        const $element = $elementTemplate.content.cloneNode(true)
        $element.getElementById("element-text").textContent =el[1];
        $element.querySelector(".element").setAttribute("data-id", el[0] )
           $element.querySelector(".btn-delete").addEventListener("click", e => {
       $elementsContainer.removeChild(e.target.parentNode.parentNode);
     localStorage.removeItem(e.target.parentNode.parentNode.getAttribute("data-id"))
    })

    $element.querySelector(".btn-edit").addEventListener("click", e => {
        const element = e.target.parentNode.parentNode.querySelector("#element-text"),
    $input = document.getElementById("input")
        ;
        $input.value = el[1];
        $input.setAttribute("data-id", element.parentNode.getAttribute("data-id") )
        $input.focus()
    })
        $elementsContainer.append($element)

    })

}

document.addEventListener("DOMContentLoaded", loadStorage)

document.getElementById("submit").addEventListener("click", event => {
    event.preventDefault()
    addElement()
})
