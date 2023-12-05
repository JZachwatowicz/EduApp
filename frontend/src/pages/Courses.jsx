import React, {useState} from 'react';
const Courses = () => {
    const [kursy, setKursy] = useState([{name:"Kurs#1", disc: "Opis kursu 1" }, {name:"Kurs#2", disc: "Opis kursu 2"}, {name: "Kurs#3",disc:"Opis kursu 3"}, {name:"Kurs#4",disc: "opis kursu 4"}]);
    const [currentDesc , setDesc] = useState(0)
    const handleSubmit = (event) => {

    }
    return(
        <div class="container-fluid px-0">
        <div class="row m-5">
            <div class="m-3 bg-primary rounded-4 shadow-sm col-3 p-3 shadow-sm d-flex flex-column">
                <h3 class="align-self-center">Dostępne kursy</h3>
                {kursy.map( (kurs,index) => (
                    <button key={index} className="m-2 my-3 p-2 btn btn-trinary shadow-sm" onClick={() => {setDesc(index)}}>{kurs.name}</button>
                ))}
            </div>
            <div class="col-8 container shadow-sm border border-2 border-primary rounded-4 my-3">
                <form class="m-3 my-4 d-flex flex-column h-100">
                    <h4 className="m-2">{kursy[currentDesc].name}</h4>
                    <p className="m-2">{kursy[currentDesc].disc}</p>
                    <button key={currentDesc} className="m-2 my-3 p-3 btn btn-trinary shadow-sm bottom " onSubmit={handleSubmit}>Zapisz się na kurs</button>
                </form>
            </div>
        </div>
        </div>
    )
};

export default Courses;