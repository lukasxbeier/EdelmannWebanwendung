   //Prägefolie hinzufügen
   function showpf2() {
    var x = document.getElementById("pf2");
    var y = document.getElementById("pf2btn");
      if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
      } else {
        x.style.display = "none";
      }
  }
  //Theoretisch für Prägefolie Nummer 3 (wird nie benötigt, da technisch nicht möglich)
  function showpf3() {
    var x = document.getElementById("pf3");
    var y = document.getElementById("pf3btn");
      if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
      } else {
        x.style.display = "none";
      }
  }
    //NUMPAD- Funktionen bei Feldern
    window.addEventListener("load", function(){
      // BASIC
      numpad.attach({
        target: "demoB",
        decimal: false,
        max:10
    });
      // WITH OPTIONS
      
        numpad.attach({
        target: "demoC"
      });
        
      numpad.attach({
        target: "demoE",
        max:10
      });
      numpad.attach({
        target: "demoD",
        max:10,
        decimal: false,
      });
      numpad.attach({
        target: "demoF",
        decimal: false,
        max:10
    });
      // WITH OPTIONS
      
        numpad.attach({
        target: "demoG"
      });
        
      numpad.attach({
        target: "demoK",
        max:10
      });
    });