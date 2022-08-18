// Kreirati JSON koji cuva podatke o korisnicima: id, ime i prezime => kreiran fajl korisnici.json

//obnavljanje

// const jsonText = `[
//     {
//         "id": 1,
//         "ime": "Tamara",
//         "prezime": "Brkic"
//     },
//     {
//         "id": 2,
//         "ime": "Andjela",
//         "prezime": "Vlajic"
//     }
// ]`;

// const jsonObj = JSON.parse(jsonText);

// console.log(jsonObj);

// const jsonObj1 = [
//     {
//         "id": 1,
//         "ime": "Tamara",
//         "prezime": "Brkic"
//     },
//     {
//         "id": 2,
//         "ime": "Andjela",
//         "prezime": "Vlajic"
//     }
// ];

// const jsonText1 = JSON.stringify(jsonObj1);

// console.log(jsonText1);

// Napisati asinh. zahtev za dohvatanje podataka iz fajla korisnici.json
// Ispisati u konzoli rezultat asinh. zahteva, ukoliko je uspesno preuzet sadrzaj fajla.

async function dohvatiKorisnike() {
    try {
        const data = await fetch(`korisnici.json`).then(result => {
            if (result.ok) {
                return result.json();
            }
            throw new Error(result.status + " " + result.statusText);
        });
        console.log(data);
        prikaziKorisnike(data);
    }
    catch (err) {
        console.log(err);
    }
}

dohvatiKorisnike();

// Prikazati dobijene korisnike iz JSON fajla u formi tabele u okviru bloka id="korisnici"

function prikaziKorisnike(data) {
    let ispis = `<table><tr><th>Id</th><th>Ime</th><th>Prezime</th></tr>`;
    data.forEach(element => {
        ispis += `<tr><td>${element.id}</td><td>${element.ime}</td><td>${element.prezime}</td></tr>`;
    });
    ispis += `</table>`;
    document.getElementById("korisnici").innerHTML = ispis;
}

// Kreirati asinh. zahtev ka nepostojećem fajla asinh..json i prikazati u konzoli greske koje nastaju.
// Prikazati u konzoli status i tekst neuspešnog asinh. zahteva.

async function dohvatiNepostojeceKorisnike() {
    try {
        const data = await fetch(`asinh..json`).then(result => {
            if (result.ok) {
                return result.json();
            }
            // throw new Error(result.toString());
            throw new Error(result.status + " " + result.statusText);
        });
        // console.log(data);
        prikaziKorisnike(data);
    }
    catch (err) {
        console.log(err);
    }
}

dohvatiNepostojeceKorisnike();

// Kreirati asinh. zahtev ka fajlu kategorije.json i prikazati dobijene kategorije u okviru dropdown liste sa id="kategorije"

async function dohvatiKategorije() {
    try {
        const data = await fetch(`kategorije.json`).then(result => {
            if (result.ok) {
                return result.json();
            }
            throw new Error(result.status + " " + result.statusText);
        });
        // console.log(data);
        prikaziKategorije(data);
    }
    catch (err) {
        console.log(err);
    }
}

dohvatiKategorije();

function prikaziKategorije(data) {
    let ispis = `<option value="0">Izaberite</option>`;
    data.forEach(element => {
        ispis += `<option value="${element.id}">${element.naziv}</option>`;
    });
    document.getElementById("kategorije").innerHTML = ispis;
}

// Kreirati asinh. zahtev ka fajlu proizvodi.json i prikazati proizvodi u okviru bloka id="proizvodi" u skladu sa priloženim šablonom.

async function dohvatiProizvode() {
    try {
        const data = await fetch(`proizvodi.json`).then(result => {
            if (result.ok) {
                return result.json();
            }
            throw new Error(result.status + " " + result.statusText);
        });
        // console.log(data);
        prikaziProizvode(data);
    }
    catch (err) {
        console.log(err);
    }
}

dohvatiProizvode();

function prikaziProizvode(data) {
    let ispis = ``;
    data.forEach(element => {
        ispis += `					<div class="proizvod">
        <h3>${element.naziv}</h3>
        <img src="${element.slika}"/>
        <p class="proizvod-opis">
            <span class="cena">Cena: ${element.cena} RSD</span>
            <span class="kategorija">Kategorija: ${element.kategorija.naziv}</span>
        </p>
    </div>`;
    });
    document.getElementById("proizvodi").innerHTML = ispis;
}

// Klikom na taster sa id="btnPrikazi", prikazati samo proizode koji pripadaju kategoriji koja je izabrana iz dropdown liste.

btnPrikazi.addEventListener("click", dohvatiProizvodeIzKategorije);

async function dohvatiProizvodeIzKategorije() {
    console.log(kategorije.value);
    try {
        var data = await fetch(`proizvodi.json`).then(result => {
            if (result.ok) {
                return result.json();
            }
            throw new Error(result.status + " " + result.statusText);
        })
        if (kategorije.value != 0)
            data = data.filter(proizvod => proizvod.kategorija.id == kategorije.value);
        prikaziProizvode(data);
    }
    catch (err) {
        console.log(err);
    }
}

// Klikom na link " Sortiraj po nazivu " sortirati prozivode po nazivu u rastucem redosledu. (Dohvatiti ponovo proizvode iz JSON fajla)

document.getElementById("sort-naziv").addEventListener("click", sortirajPoNazivuIzFajla);

async function sortirajPoNazivuIzFajla() {
    try {
        var data = await fetch(`proizvodi.json`).then(result => {
            if (result.ok) {
                return result.json();
            }
            throw new Error(result.status + " " + result.statusText);
        });
        if (kategorije.value != 0) data = data.filter(proizvod => proizvod.kategorija.id == kategorije.value);
        data = data.sort((a, b) => a.naziv > b.naziv ? 1 : -1);
        prikaziProizvode(data);
    }
    catch (err) {
        console.log(err);
    }
}

// Klikom na link " Sortiraj po ceni " sortirati prozivode po ceni u opadajucem redosledu. (Sortirati DOM)

document.getElementById("sort-cena").addEventListener("click", sortirajPoCeniDOM);

function sortirajPoCeniDOM() {
    let proizvodi = document.querySelectorAll(".proizvod");
    console.log(proizvodi);
    console.log(proizvodi.length);


    for (let i = 0; i < proizvodi.length - 1; i++) {
        for (let j = i + 1; j < proizvodi.length; j++) {
            let cenaI = parseInt(proizvodi[i].querySelector(".cena").innerHTML.split(" ")[1]);
            let cenaJ = parseInt(proizvodi[j].querySelector(".cena").innerHTML.split(" ")[1]);

            if (cenaI > cenaJ) {
                let temp = proizvodi[i].innerHTML;
                console.log(temp);
                proizvodi[i].innerHTML = proizvodi[j].innerHTML;
                proizvodi[j].innerHTML = temp;
            }
        }
    }
}

// Realan primer upotrebe JSON + asinh.:
// Na stranici https://www.yahoo.com/news/weather/serbia/beograd/belgrade-532697/ nalazi se widget koji prikazuje vremensku prognozu.
// Nas zadatak je da preuzmemo podatke o vremenskoj prognozi.
// Postavlja se pitanje: Kako je to moguce?
// Da bi omogucio programerima da preuzmu podatke o vremenu, YAHOO je kreirao servis koji vraca podatke o vremenu iz njihove baze podataka u formi JSON-a : https://developer.yahoo.com/weather/
// Kreirati upit: select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="Belgrade") and u='c'
// Kreirati asinh. zahtev ka dobijenom linku i prikazati podatke o vremenu u formi tabele u bloku sa id="prognoza"

//https://developer.yahoo.com/weather/ ne radi, pa je koriscen https://openweathermap.org/api

async function dohvatiCurrentWeather() {
    try {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Belgrade&appid=e2184332b199af39de1564d48b2379e0&units=metric&lang=sr`).then(result => {
            if (result.ok) {
                return result.json();
            }
            throw new Error(result.status + " " + result.statusText);
        });
        // console.log(data);
        prikaziCurrentWeather(data);
    }
    catch (err) {
        console.log(err);
    }
}

dohvatiCurrentWeather();

function prikaziCurrentWeather(data) {
    console.log(data);
    let ispis = `<table>
    <tr>
        <td>Lokacija:</td>
        <td>${data.name}, ${data.sys.country}</td>
    </tr>
    <tr>
       <td>Trenutno stanje:</td>
       <td>${data.weather[0].main} (${data.weather[0].description}) </td>
    </tr>
    <tr>
       <td>Temperatura: </td>
       <td>${data.main.temp} °C</td>
    </tr>
    <tr>
       <td>Subjektivni osećaj: </td>
       <td>${data.main.feels_like} °C</td>
    </tr>
    <tr>
       <td>Minimalna dnevna temperatura: </td>
       <td>${data.main.temp_min} °C</td>
    </tr>
    <tr>
       <td>Maksimalna dnevna temperatura: </td>
       <td>${data.main.temp_max} °C</td>
    </tr>
    <tr>
       <td>Pritisak: </td>
       <td>${data.main.temp_min} °C</td>
    </tr>
    <tr>
       <td>Vlažnost: </td>
       <td>${data.main.humidity} °C</td>
    </tr>
    <tr>
       <td>Vidljivost: </td>
       <td>${data.visibility} m</td>
    </tr>
    <tr>
       <td>Vetar: </td>
       <td>${data.wind.speed} km/č</td>
    </tr>    
    <tr>
       <td>Oblačnost: </td>
       <td>${data.clouds.all} %</td>
    </tr>
 </table>`;
    document.getElementById("prognoza").innerHTML = ispis;
}
