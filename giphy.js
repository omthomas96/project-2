function handleClick() {
  const qEle = document.getElementById("q"); //<input type="text" id="q">
  const q = qEle.value;
  const outputAreaEle = document.getElementById("outputArea"); //         <div id="outputArea">
  outputAreaEle.innerHTML += "<h2>" + q + "</h2>";
  one();
  two();
}
async function one() {
  console.log("one");
}
async function two() {
  console.log("two");
}

fetch(`http://api.giphy.com/v1/gifs/random?api_key=DNTMN9dKFRLsqkl8nNp3gUFMdXmi6oLW`).then((res)=> {
Console.log(``);
});