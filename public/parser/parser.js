/**
 * Parses palette hash for export and print
 * Author: Darien Tsai
 * Date: 8/23/19
*/

//#Name{/Author{/{$}Group+1{:}hello{%}One{:}yes{&}2mylo{%}Two{:}no{&}6h2ij{$}Group+2{:}hellow+world{%}Three{:}one+two+three{&}ljl0
let data = window.location.hash.substring(1);
if(
  data.includes("{/") &&
  data.includes("{$}") &&
  data.includes("{:}") &&
  data.includes("{&}") &&
  data.includes("{%}")
  ){
  window.location.hash = "ThankYou!__✌(◠‿◠)";
  let details = data.split("{/");

  const palette = details[0].split("+").join(' ');
  const author = details[1].split("+").join(' ');
  let groups = [];

  data = details[2].split("{$}");

  for(let i = 1; i < data.length; i += 1){
    let colors = [];
    details = data[i].split("{%}");
    let gName = details[0].split("{:}")[0].split("+").join(' ');
    let gDesc = details[0].split("{:}")[1].split("+").join(' ');
    let cName = "", cNote = "", cVal = "";

    for(let j = 1; j < details.length; j += 1){
      let cPartition = details[j].split("{:}");
      cName = cPartition[0].split("+").join(' ');
      cPartition = cPartition[1].split("{&}");
      cNote = cPartition[0].split("+").join(' ');
      cVal = parseInt(cPartition[1], 36).toString(16);
      while(cVal.length < 6){cVal = "0" + cVal;}
      cVal = "#" + cVal;
      colors.push({name: cName, notes: cNote, val: cVal});
    }
    groups.push({name: gName, desc: gDesc, list: colors});
  }

  console.log(groups);

  let markup =  "<button onclick=\"window.print()\" class=\"print\">Print</button>" +
                "<div id=\"header\">" +
                "<p class=\"title\">" + palette +"</p>" +
                "<p class=\"\">" + author + "</p>" +
                "</div>";

  for(let i = 0; i < groups.length; i += 1){
    markup += "<div class=\"group\">" + 
              "<h1 class=\"heading\">" + groups[i].name + "</h1>" + 
              "<p class=\"desc\">" + groups[i].desc + "</p>" + 
              "<table>";

    let colorList = groups[i].list;
    console.log(colorList);
    for(let j = 0; j < colorList.length; j += 1){
      markup += "<tr>" +
                "<td>" + colorList[j].name + "</td>" +
                "<td bgcolor=\"" + colorList[j].val + "\"></td>" +
                "<td>" + colorList[j].val + "</td>" +
                "<td>" + colorList[j].notes + "</td>" +
                "</tr>";
    }
    markup += "</table></div>";
  }

  markup += "<button onclick=\"window.print()\" class=\"print\">Print</button>";

  console.log(markup);
  let page = document.getElementById('paging');
  page.innerHTML = markup;
}

else{
  window.location.assign("err.html");
}