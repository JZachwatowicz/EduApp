import React from 'react';
import {Link} from "react-router-dom";
import Faq from "react-faq-component";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
const Contact = () => {
    const data = {
        title: "Najczęściej zadawane pytania",
        rows: [{title:"Pytanie#1", content: "Odpowiedź#1" },
            {title:"Pytanie#2", content: "Odpowiedź#2"},
            {title: "Pytanie#3",content:"Odpowiedź#3"},
            {title:"Pytanie#4",content: "Odpowiedź#4"},
            {title:"Pytanie#5", content: "Odpowiedź#5" },
            {title:"Pytanie#6", content: "Odpowiedź#6"}]
    }
    const styles = {

        titleTextColor: "black",
        rowTitleColor: "orange",
        // arrowColor: "red",
    };
    const config = {
        animate: true,
        openOnload: 0,
        expandIcon: "v",
        collapseIcon: "v",
    };
    return(
        <div className="container-fluid px-0">
            <div className="row mx-5 ">
                <BreadcrumbsItem to='/Kontakt'>Kontakt</BreadcrumbsItem>
                <span className="col-7 d-flex justify-content-center"><h2>Kontakt</h2></span>
            </div>
            <div className="row mx-5">
                <div className="col-7 ">
                    <div className=" container p-3 shadow-sm border border-2 border-primary rounded-4 my-3 d-flex flex-column align-items-center">
                        <p>Dane kontakt</p>
                        <p>Inne dane</p>

                    </div>
                </div>

                <div className=" col-4 p-3 container shadow-sm border border-2 border-primary rounded-4 my-3">
                    <Faq
                        data={data}
                        styles={styles}
                        config={config}
                    />
                </div>
            </div>
        </div>
    )
};

export default Contact;