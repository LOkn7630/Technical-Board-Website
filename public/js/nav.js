// let el = document.querySelector(".tabs");
const listOfTabs = document.querySelectorAll(".tablink");

for (let i = 0; i < listOfTabs.length; i++) {
  listOfTabs[i].addEventListener("click", (e) => {
    const clickedTab = e.target.parentNode;
    clickedTab.classList.add("active");

    const tabs = e.target.parentNode.parentNode.children;
    for (let tab of tabs) {
      if (tab !== e.target.parentNode && tab.classList[0] !== "indicator")
        tab.classList.remove("active");
    }
  });
}

// $(".tablink").click(function() {
      
//     // Select all list items
//     var listItems = $(".tablink");
      
//     for (let i = 0; i < listItems.length; i++) {
//         listItems[i].classList.remove("active");
//     }
//           this.classList.add("active");
// });

function openPage(pageName) {
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(pageName).style.display = "block";
}

document.getElementById("defaultOpen").click();
