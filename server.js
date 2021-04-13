const express = require("express");
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const bodyParser = require ('body-parser');
var alert = require('alert');



const adapter = new FileSync('db.json');
const db = low(adapter);
const app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'))
app.use(bodyParser.json())

app.listen(3000,function () {
    console.log ("listening on 3000");
})


const defaultData = {
    rückmeldenummer: [
        {
            id: 0,
            nummer: 0,
            auftrag: 0,
            
        },
    ],
    rückmeldungen: [
        {
            id: 0,
            materialnummer: 0,
            bänderanzahl: 0,
            bandbreite: 0,
            vorzug: 0,
            bogenanzahl: 0,
            rückmeldenummer: 0,
            auftrag: 0,

        },
    ],
};
    
   
db.defaults(defaultData).write();

app.get("/", (req, res) => {
    
    res.render("index.ejs");
});
app.get("/rueck", (req, res) => {
    const lastRückmeldenummer = db.get("rückmeldenummer").takeRight(1).value()[0];
    const Id = lastRückmeldenummer.id;
    console.log(Id);
    const rückmeldenummer = db.get("rückmeldenummer").takeRight(1).value()[0];
    console.log(rückmeldenummer);
    res.render("rückmeldung.ejs", { rückmeldenummer: rückmeldenummer, Id: Id});
});





app.post("/nummer", (req, res)=> {
    
    const nummer = req.body.rückmeldenummer;

    const lastRückmeldenummer = db.get("rückmeldenummer").takeRight(1).value()[0];

    console.log(lastRückmeldenummer);

    const nextId = lastRückmeldenummer.id +1;
    const auftrag = 12345;
    db.get("rückmeldenummer").push({ id: nextId, nummer: nummer, auftrag: auftrag}).write();
    
    res.redirect("/rueck");
   
    
});

app.post("/daten", (req, res)=> {
    const materialnummer = req.body.prägefolie;
    const bänderanzahl = req.body.anzahl_bänder;
    const bandbreite = req.body.bandbreite;
    const vorzug = req.body.abzug;
    const bogenanzahl = req.body.anzahl;

    const nummern = db.get("rückmeldenummer").takeRight(1).value()[0];
    const rückmeldenummer = nummern.nummer;
    const auftrag = nummern.auftrag;
   
   
    const lastData = db.get("rückmeldungen").takeRight(1).value()[0];

    console.log(lastData);
    const nextId = lastData.id +1;
    if (bänderanzahl == ""){
        alert("blabla");

    }
    db.get("rückmeldungen").push({ id: nextId, materialnummer: materialnummer, bänderanzahl: bänderanzahl, bandbreite: bandbreite, vorzug: vorzug, bogenanzahl: bogenanzahl, rückmeldenummer: rückmeldenummer, auftrag: auftrag}).write();

    const nextnextId = nextId +1;
    const materialnummer2 = req.body.prägefolie2;
    const bänderanzahl2 = req.body.anzahl_bänder2;
    const bandbreite2 = req.body.bandbreite2;
    const vorzug2 = req.body.abzug2;
    if(materialnummer2 != ""){
        db.get("rückmeldungen").push({ id: nextnextId, materialnummer: materialnummer2, bänderanzahl: bänderanzahl2, bandbreite: bandbreite2, vorzug: vorzug2, bogenanzahl: bogenanzahl, rückmeldenummer: rückmeldenummer, auftrag: auftrag}).write();
    }
    res.redirect("/");
    
    });