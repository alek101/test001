class Igra{ //formiranje igre
    constructor(){
        this.name="Yut Nuri";
        this.naPotezu="A"; //ko je na potezu
        this.scoreA=0; //broj malova koji su stigli do kraja za A
        this.scoreB=0; //broj malova koji su stigli do kraja za B
        this.zadnjeBacanje=0; //zadnje bacanje jut stapova
        this.malID=0; //osiuranje da svaki mal ima jedinstven id
        this.skupMal=[]; //niz objekata malova
        this.baceno=[]; //niz bacenih jotova od strane jednog igraca
        this.blokadaBacanja=false; //Da li igrac ima pravo da baca stapove?
        this.prikaz=false; //Prikazuje se samo bacanje igraca koji je na potezu, inace se ne vidi
        this.brojMalA=4; //ukupan broj malova koji mogu da se pozovu za A
        this.brojMalB=4; //ukupan broj malova koji mogu da se pozovu za B  
        this.pravilo_minus_1=false; //specijano pravilo u kome se dozvoljava -1 kao bacanje
        this.hint_0=false; //sugestije za igrace iz popdesavanja
        this.hint_1=false; //sugestije za igrace iz popdesavanja
        this.hint_2=false; //sugestije za igrace iz popdesavanja
        this.blokadaMala=true; //blokira se dodavanje pozicije malu, osim ako se ne igra sa njime
        this.obavestenje="";
    }
}

class Mal{ //formiranje zetona za igru
    constructor(pdoc,ppripadnost){
        this.doc=pdoc; //zetonov selektor, tipa document.querySelctor
        this.value=1; //koliko je zetona grupisano
        this.pripadnost=ppripadnost; //igracu A ili B
        this.pos=0; //pozicija na tabli
    }
}

//Bacaju se 4 Jut stapa.
Igra.prototype.bacanje=function(){
    if(!this.blokadaBacanja){
    var s="",
        br=0;
    for (let i=1;i<=4;i++){
        t=parseInt(Math.random()*2);
        br+=t;
        s+=t;
    }
    if (br==0) br=5;
    if (s=="1000" && this.pravilo_minus_1==true) br=-1; //-1 specijalno pravilo
    this.zadnjeBacanje=br;
    this.prikaz=true;
    this.blokadaMala=false;
    this.baceno.push(this.zadnjeBacanje);
    if(this.zadnjeBacanje<=3){
    this.blokadaBacanja=true;
        }
    }
}

//funkcija za promenu poteza igraca
Igra.prototype.zavrsenPotez=function(){
        if(this.naPotezu=="A") this.naPotezu="B";
        else   this.naPotezu="A";
        this.blokadaBacanja=false;
        this.prikaz=false;
        this.baceno=[];
}

//U zavisnosti od bacenih Jut stapova, Mal se krece po tabli na sledeci nacin:
Igra.prototype.kretanje=function(predhodno,bacanje){
    var sledece;
        if(bacanje>0){
            if (predhodno<5) sledece=predhodno+bacanje;
            else if (predhodno==5){
                if (bacanje<3) sledece=predhodno+bacanje+5;
                else sledece=predhodno+bacanje+7;
            } 
            else if (predhodno>5 && predhodno<10){
                if(predhodno+bacanje<11) sledece=predhodno+bacanje;
                else sledece=predhodno+bacanje+7;
            }
            else if(predhodno==10){
                if (bacanje<4) sledece=predhodno+bacanje+2;
                else sledece=predhodno+bacanje+13;
            }
            else if(predhodno==11){
                if(bacanje==1) sledece=12;
                else if(bacanje == 2) sledece=15;
                else if(bacanje >=3 && bacanje <5) sledece=predhodno+bacanje+2;
                else sledece=predhodno+bacanje+6;
            }
            else if(predhodno==12){
                if(bacanje < 4) sledece=predhodno+bacanje+2;
                else sledece=predhodno+bacanje+6;
            }
            else if(predhodno==13 || predhodno==14){
                if(predhodno+bacanje<16) sledece=predhodno+bacanje;
                else sledece=predhodno+bacanje+11;
            }
            else if(predhodno==15){
                if(predhodno+bacanje+11<29) sledece=predhodno+bacanje+11;
                else sledece=29;
            }
            else if(predhodno==16){
                if(bacanje==1) sledece=17;
                else sledece=predhodno+bacanje+4;
            }
            else if(predhodno==17) sledece=predhodno+bacanje+4;
            else if(predhodno>17 && predhodno<27){
                if(predhodno+bacanje<27) sledece=predhodno+bacanje;
                else sledece=29;
                }
            else if(predhodno>=27)
                if(predhodno+bacanje<=28) sledece=predhodno+bacanje;
                else sledece=29;
        }

        else if(bacanje==0){sledece=predhodno}

        else if(bacanje==-1){
            if (predhodno == 0) sledece=26;
            else if(predhodno==11) sledece=5;
            else if(predhodno==13) sledece=10;
            else if(predhodno ==15) sledece=14;
            else if(predhodno == 18) sledece=10;
            else if(predhodno == 27) sledece=15;
            else{
                sledece=predhodno-1;
            }
        }
    return sledece;
}

//Stampanje rezultata
Igra.prototype.stampa=function(){

    //Stampanje izgleda polja start
    document.querySelector("div.polje[data-imePolja='"+0+"']").innerHTML="S";
    document.querySelector("div.polje[data-imePolja='"+0+"']").classList.add("poljeN");

    //Stampanje polja po tabli. Ako je neki Mal na nekom polju, onda se ovde to pokaze. 
    for(i=1;i<=28;i++){
       
        document.querySelector("div.polje[data-imePolja='"+i+"']").innerHTML=" ";    
        document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeN2");
        document.querySelector("div.polje[data-imePolja='"+i+"']").classList.add("poljeN");

        if(i==5) {
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeN");
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.add("poljeN2");
        }

        if(i==10) {
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeN");
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.add("poljeN2");
        }

        if(i==15) {
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeN");
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.add("poljeN2");
        }

        if(i==22) {
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeN");
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.add("poljeN2");
        }
    }

    document.querySelector('#naPotezu').innerHTML="Na potezu je igrac "+this.naPotezu;
    document.querySelector('#rezultatA').innerHTML="Rezultat A je: "+this.scoreA;
    document.querySelector('#rezultatB').innerHTML="Rezultat B je: "+this.scoreB;
    document.querySelector('#rezultatA1').innerHTML="Ostalo malova: "+this.brojMalA;
    document.querySelector('#rezultatB1').innerHTML="Ostalo malova: "+this.brojMalB;
    
    if(igra.naPotezu=="A"){
        document.querySelector('.statusA').classList.add("okvir");
        document.querySelector('.statusB').classList.remove("okvir");
    }
    else {
        document.querySelector('.statusB').classList.add("okvir");
        document.querySelector('.statusA').classList.remove("okvir");
    }
    
    if(this.prikaz){
            if (this.zadnjeBacanje<=3){
            document.querySelector('#bacanje').innerHTML="Zadnje je baceno: "+this.baceno;
            }
            else{
            document.querySelector('#bacanje').innerHTML="Bacaj opet!"+"<br>"+"Zadnje je baceno: "+this.baceno;
            }
    }
    else{
        document.querySelector('#bacanje').innerHTML="";
    }
    document.querySelector('#obavestenje').innerHTML=this.obavestenje;

}

//Resetovanje rezultata
Igra.prototype.reset=function(){
    this.naPotezu="A";
    this.scoreA=0;
    this.scoreB=0;
    this.zadnjeBacanje=0;
    this.malID=0;
    this.skupMal=[];
    this.baceno=[];
    this.blokadaBacanja=false;
    this.prikaz=false;
    this.brojMalA=4;
    this.brojMalB=4;
    this.blokadaMala=true;
    this.obavestenje="";
    var brisani=document.querySelectorAll('div.mal');
    var u=brisani.length;
    for (var i=0;i<u;i++){
        document.querySelector('div.mal').remove();
    };
}

//Dodavanje poena A i B
Igra.prototype.dodajA=function(){
    this.scoreA++;
    this.brojMalA--;
    if(this.scoreA>=4) this.obavestenje="Igrac A je pobedio!";
}

Igra.prototype.dodajB=function(){
    this.scoreB++;
    this.brojMalB--;
    if(this.scoreB>=4)  this.obavestenje="Igrac B je pobedio!";
}

//Pozivanje mala od strane igraca A i B
Igra.prototype.dodajMalA=function(){
    if(this.naPotezu == "A"){
         if(this.brojMalA>0){  
            var e=document.createElement('div');
            e.setAttribute("id","id"+this.malID+"");
            e.classList.add("malA");
            e.classList.add("mal");
            document.body.appendChild(e);
            var t=document.getElementById("id"+this.malID+"");
            var l=new Mal(t,"A");
            this.skupMal.push(l);
            this.malID++;
            this.brojMalA--;
            this.obavestenje="";
        }
        else{
            this.obavestenje="Igrac A je dodao sve malove!";
        }
    }
}

Igra.prototype.dodajMalB=function(){
    if(this.naPotezu == "B"){
        if(this.brojMalB>0){
            var e=document.createElement('div');
            e.setAttribute("id","id"+this.malID+"");
            e.classList.add("malB");
            e.classList.add("mal");
            document.body.appendChild(e);
            var t=document.getElementById("id"+this.malID+"");
            var l=new Mal(t,"B");
            this.skupMal.push(l);
            this.malID++;
            this.brojMalB--;
            this.obavestenje="";
        }
        else{
            this.obavestenje="Igrac B je dodao sve malove!";
        }
    }
}

//trazenje mala u nizu malova u zavisnosti od doc.selektora; selektor je jedinstven pa sluzi i kao ime
Igra.prototype.nadjiMalind=function(doc){
    var l=this.skupMal.length;
    for(let i=0;i<l;i++){
        if(this.skupMal[i].doc==doc) return i;
    }
}

//funkcija za pomeranje mala po tabli i dodavanje pozicije
Igra.prototype.pomerajMal=function(element) {
    
    var p1 = 0, 
        p2 = 0, 
        p3 = 0, 
        p4 = 0,
        that=this;
        
    element.onmousedown = klik_na_mis;
      
    function klik_na_mis(e) {
      e = e || window.event;
      e.preventDefault();
    //   console.log("onmouse down");
      // pozicija misa na pocetku:
      p3 = e.clientX;
      p4 = e.clientY;
    
      var ind=that.nadjiMalind(element);
      var h=that.skupMal[ind].pos;
      var t=that.kretanje(h,that.zadnjeBacanje);
      if(t>=29) t=0;
      if(that.hint_2 && !that.blokadaMala) document.querySelector("div.polje[data-imePolja='"+t+"']").classList.add("okvir2");
      if(that.hint_2 && that.blokadaMala) document.querySelector("div.polje[data-imePolja='"+h+"']").classList.add("okvir2");

      document.onmouseup = pustanje_misa;
      // pozovi funkciju kada se mis pomera:
      document.onmousemove = pomeraj;
    }
  
    function pomeraj(e) {
      e = e || window.event;
      e.preventDefault();
      // izracunaj novu poziciju misa:
      p1 = p3 - e.clientX;
      p2 = p4 - e.clientY;
      p3 = e.clientX;
      p4 = e.clientY;
      // postavi novu poziciju elementa:
      element.style.top = (element.offsetTop - p2) + "px";
      element.style.left = (element.offsetLeft - p1) + "px";
    }
  
    function pustanje_misa() {
      /* zavrsi operaciju prevlacenja:*/
    
      var ind=that.nadjiMalind(element);
      var h=that.skupMal[ind].pos;
        var t=that.kretanje(h,that.zadnjeBacanje);
        if (!that.blokadaMala) that.skupMal[ind].pos=t;
        if(t>=29) t=0;
        if(h>=29) h=0;
        if(that.hint_2 && !that.blokadaMala) document.querySelector("div.polje[data-imePolja='"+t+"']").classList.remove("okvir2");
        if(that.hint_2 && that.blokadaMala) document.querySelector("div.polje[data-imePolja='"+h+"']").classList.remove("okvir2");
        that.blokadaMala=true;
      document.onmouseup = null;
      document.onmousemove = null;
        }
  }

//funkcija za brisanje mala iz HTML-a
Igra.prototype.obrisiMal=function(element){
    element.oncontextmenu=obrisi; 
    var that=this;
    function obrisi(e){
        e = e || window.event;
        e.preventDefault();
        
        var ind=that.nadjiMalind(element);
        var t=that.skupMal[ind].value;
        var p=that.skupMal[ind].pripadnost;

        element.remove();
        if(p=="A"){
            that.brojMalA=that.brojMalA+t;
        }
        else if(p=="B"){
            that.brojMalB=that.brojMalB+t;
        }
        that.stampa();
    }
    
}

//funkcija za dupliranje malova
Igra.prototype.duplirajMal=function(element){
    element.ondblclick=dupliraj; 
   var that=this;
    function dupliraj(e){
        e = e || window.event;
        e.preventDefault();

        var ind=that.nadjiMalind(element);
        var t=that.skupMal[ind].value;
        var p=that.skupMal[ind].pripadnost;

        if(that.naPotezu==p){
            that.skupMal[ind].value++;
            element.innerHTML=t+1;
            if(p=="A"){
                that.brojMalA=that.brojMalA-1;
            }
            else if(p=="B"){
                that.brojMalB=that.brojMalB-1;
            }
        }
        that.stampa();
    }
}

//Slede dve metode za davanje sgestija vezanih za tablu
Igra.prototype.hintT=function(){
    var that=this;
    for(let i=0;i<=28;i++){
            document.querySelector("div.polje[data-imePolja='"+i+"']").addEventListener('mouseenter',function(){
            
                var t=that.kretanje(i,that.zadnjeBacanje);
                if(t>=29) t=0;
                if(that.hint_0) document.querySelector("div.polje[data-imePolja='"+t+"']").classList.add("okvir");     
            });
        } 
    
        for(let i=0;i<=28;i++){
            document.querySelector("div.polje[data-imePolja='"+i+"']").addEventListener('mouseleave',function(){
                for(let i=0;i<=28;i++){
                    document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("okvir");
                }
            });
        } 
}

Igra.prototype.hint1=function(){
    var that=this;
    function ocistiHint(){
        for(let i=0;i<=28;i++){
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("okvir");
        }
    }

    for(let i=0;i<=28;i++){
        document.querySelector("div.polje[data-imePolja='"+i+"']").addEventListener('mouseenter',function(){
        
            var t=that.kretanje(i,that.zadnjeBacanje);
            if(t>=29) t=0;

            if(that.hint_1) document.querySelector("div.polje[data-imePolja='"+t+"']").classList.add("okvir");

            setTimeout(function(){
                ocistiHint()}, 4000); //sada je podeseno na 4 sek!
        });
    } 

    for(let i=0;i<=28;i++){
        window.addEventListener('mouseup',function(){
            ocistiHint();
        });
    }  
}

//pozivamo objekat igra
var igra=new Igra();

//podesavanje menija za podesavanje
document.querySelector('.settings').addEventListener('mouseleave',function(){

    var p=document.querySelector('#praviloMinus1').checked;
    (p)? igra.pravilo_minus_1=true:igra.pravilo_minus_1=false;

    var p1=document.querySelector('#checkHintT').checked;
    (p1)? igra.hint_0=true:igra.hint_0=false;

    var p2=document.querySelector('#checkHint').checked;
    (p2)? igra.hint_1=true:igra.hint_1=false;

    var p3=document.querySelector('#checkHint2').checked;
    (p3)? igra.hint_2=true:igra.hint_2=false;
    
});

//pozivamo sve potrebne funkcije
igra.stampa();
igra.hintT();
igra.hint1();

//povezivanje funkcija sa tasterima
document.querySelector('#potez').onclick=function(){
    if(!igra.blokadaBacanja){
    igra.bacanje();
    igra.stampa();
    }
}

document.querySelector('#zavrsen_potez').onclick=function(){
    igra.zavrsenPotez();
    igra.stampa();
}

document.querySelector('#reset').onclick=function(){
    igra.reset();
    igra.stampa();
}

document.querySelector('#dodajA').onclick=function(){
    igra.dodajA();
    igra.stampa();
}

document.querySelector('#dodajB').onclick=function(){
    igra.dodajB();
    igra.stampa();
}

document.querySelector('#dodajMalA').onclick=function(){
    igra.dodajMalA();
    for(var i=0;i<igra.skupMal.length;i++){
            igra.pomerajMal(igra.skupMal[i].doc);
            igra.obrisiMal(igra.skupMal[i].doc);
            igra.duplirajMal(igra.skupMal[i].doc);
            
    }
    igra.stampa();
}

document.querySelector('#dodajMalB').onclick=function(){
    igra.dodajMalB();
    for(var i=0;i<igra.skupMal.length;i++){
        igra.pomerajMal(igra.skupMal[i].doc);
        igra.obrisiMal(igra.skupMal[i].doc);
        igra.duplirajMal(igra.skupMal[i].doc);
   
    }
    igra.stampa();
}



//Kako bi igra mogla da se igra i preko tastature. Space za odigraj i Enter za reset. 
window.addEventListener('keyup',function(e){
    var key=e.keyCode;
    e.preventDefault();
    if (key==66){
        if(!igra.blokadaBacanja){
            igra.bacanje();
            igra.stampa();
        }
    }
    if (key==13){
        igra.zavrsenPotez();
        igra.stampa();
        }

    if (key==27){
        igra.reset();
        igra.stampa();
        }
});


   





  