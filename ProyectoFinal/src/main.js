var ListaMaterias = Array();
var ListaActividades = Array();


UpdateA = null;

$(function(){
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '3' + day.toString();

    var maxDate = year + '-' + month + '-' + day;

    $('#fechaActividad').attr('min', maxDate);
});

$('#document').ready(()=>{
    const SelectSemestre = document.getElementById('selectSemestre');
    SelectSemestre.addEventListener('change',ChangeSemestre);

    const SelectMateria = document.getElementById('selectMateria');
    SelectMateria.addEventListener('change',ChangeMateria);

    const AddMateria = document.getElementById('AddMateria');
    AddMateria.addEventListener('click',AddNewMateria);

    const AddActividad = document.getElementById('AddActividad');
    AddActividad.addEventListener('click',AddNewActividad);

    const ActivitiesTable = document.getElementById('ActivitiesTable');

    function UpdateSelectMaterias(){
        if(ListaMaterias.length>0){
            SelectMateria.innerHTML="";
            ListaMaterias.map(Element =>{
                if (Element.semestre === SelectSemestre.value ){
                    var option = document.createElement('option');
                    option.value = Element.name;
                    option.appendChild(document.createTextNode(Element.name));
                    SelectMateria.appendChild(option);
                }
            })
        }
    }



    function ChangeSemestre(){
        var value = SelectSemestre.value;
        UpdateSelectMaterias();
        UpdateActividades();
    }

    function ChangeMateria(){
        var value = SelectMateria.value;
        UpdateActividades();
    }

    function AddNewActividad(){
        var form =  document.getElementById("ActividadForm");
        var totalponderado = 0;

        ListaActividades.map(Element=>{

            if(SelectSemestre.value === Element.semestre && Element.materia === SelectMateria.value){

                totalponderado += Element.ponderado;
            }
        })

        console.log(totalponderado);
        console.log(parseInt(form["ponderadActividad"].value));

        if( parseInt(form["ponderadActividad"].value)<0){
            alert("Ponderado No Puede Ser Negativo");
        }
        else if(SelectMateria.value === "" || SelectMateria.value === "null"){
            alert("Selecione Materia");
        }
        else{
            var objeto = {
                semestre:SelectSemestre.value,
                materia:SelectMateria.value,
                name:form["nameActividad"].value,
                tipo:form["selectTipoActividad"].value,
                ponderado:form["ponderadActividad"].value,
                fecha:form["fechaActividad"].value,
                nota:0,
            }
            ListaActividades.push(objeto);
            UpdateActividades();
        }
    }

    function UpdateActividades(){
        ActivitiesTable.innerHTML="";
        var suma_ponderado = 0;
        var suma_notas = 0;
        ListaActividades.map((Element,key) =>{

            if(Element.semestre === SelectSemestre.value && Element.materia === SelectMateria.value){
                suma_ponderado +=  parseInt(Element.ponderado,10);
                suma_notas += Element.nota*(Element.ponderado/100);

                var tr = document.createElement('tr');

                var td1 = document.createElement('td');
                td1.appendChild(document.createTextNode(Element.name));
                var td2 = document.createElement('td');
                td2.appendChild(document.createTextNode(Element.tipo));
                var td3 = document.createElement('td');
                td3.appendChild(document.createTextNode(Element.ponderado+"%"));
                var td4 = document.createElement('td');
                td4.appendChild(document.createTextNode(Element.fecha));
                var td5 = document.createElement('td');
                td5.appendChild(document.createTextNode(Element.nota));
                var td6 = document.createElement('td');

                td6.innerHTML=`
                
                <div class="input-group">
                <input type="text" class="form-control" id="nota`+key+`" placeholder="Calificacion">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="Agregar`+key+`" onClick ="ChangeNota(`+key+`)" ><i class="fas fa-clipboard-check"></i></button>
                </div>
                </div>`
                ;




                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);

                ActivitiesTable.appendChild(tr);
            }
        });
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(""));
        var td2 = document.createElement('td');
        td2.appendChild(document.createTextNode("Total:"));
        td2.scope = "row";
        var td3 = document.createElement('td');
        td3.appendChild(document.createTextNode(suma_ponderado+"%"));
        var td4 = document.createElement('td');
        td4.appendChild(document.createTextNode("Total:"));
        td4.scope = "row";
        var td5 = document.createElement('td');
        var td6 = document.createElement('td');
        td6.appendChild(document.createTextNode(""));

        td5.appendChild(document.createTextNode(suma_notas));
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        ActivitiesTable.appendChild(tr);
        GetPromedio();
        AlertActivities();

    }
    UpdateA = UpdateActividades;
    function AddNewMateria() {
        var value = document.getElementById('materiaName').value;
        if(ValidateMateria(SelectSemestre.value,value) === true){
            var Materia = {semestre:SelectSemestre.value,name:value}
            ListaMaterias.push(Materia);
            UpdateSelectMaterias();
        }else{
            window.alert("Materia ya esta registrada")
        }


    }

    function ValidateMateria(NoSemestre,NameMateria){
        var retorno = true;
        ListaMaterias.map(Element =>{

            if (Element.semestre === NoSemestre && Element.name === NameMateria){
                retorno =  false;

            }
        })
        return retorno;
    }


    function GetPromedio(){
        var Promedio = 0;
        var notas = 0;
        ListaMaterias.map(Element=>{
            if(SelectSemestre.value === Element.semestre){
                notas++;
                var  suma =0;
                ListaActividades.map(AElement=>{
                    if(SelectSemestre.value === Element.semestre && Element.name === AElement.materia){

                        suma += AElement.nota*(AElement.ponderado/100);
                    }
                })

                Promedio += suma;
            }
        })
        notas!==0&&(document.getElementById('promedio').innerHTML = (Promedio/notas));
    }

    function AlertActivities() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        var salida = "<p>Actividades Próximas</p>";

        ListaActividades.forEach(Element => {
            var actividadDate = new Date(Element.fecha);
            var actividadDay = actividadDate.getDate();
            var actividadMonth = actividadDate.getMonth() + 1;
            var actividadYear = actividadDate.getFullYear();

           if (Element.semestre === SelectSemestre.value && (
                (actividadYear === yyyy && actividadMonth === mm && actividadDay >= dd && actividadDay <= dd + 3) ||
                (actividadYear === yyyy && actividadMonth === mm + 1 && actividadDay <= dd + 3)
            )) {
                salida += "<p><strong>" + Element.materia + ":</strong><em>" + Element.name + "</em></p>";
            }
        });
        document.getElementById('alertas').innerHTML = salida;
    }
})


function ChangeNota(localkey){
    var newnota = document.getElementById('nota'+localkey);
    ListaActividades.map((Element,key) =>{
        if(key===localkey){
            Element.nota = newnota.value;
        }
    })
    UpdateA();
}

