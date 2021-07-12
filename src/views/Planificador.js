import React,{useState,} from 'react';
import './Planificador.css'
import { v4 as uuidv4 } from 'uuid';

const CreateNewPersona = ({setPersonas,personas,forceUpdate}) =>{
    const [nombre,setNombre] = useState("")
    const [horario,setHorario] = useState(
        {
            lunes:{},
            martes:{},
            miercoles:{},
            jueves:{},
            viernes:{},
            sabado:{},
            domingo:{}
        }
        )

    const savePersona = ()=> {
        let newPersonas = personas
        if (nombre!==""){
            newPersonas.push(
                {
                    id:uuidv4(),
                    nombre:nombre,
                    lunes:horario.lunes,
                    martes:horario.martes,
                    miercoles:horario.miercoles,
                    jueves:horario.jueves,
                    viernes:horario.viernes,
                    sabado:horario.sabado,
                    domingo:horario.domingo,
                    total:56
                })
            setPersonas(newPersonas)
            setNombre("")
            forceUpdate()
            
            
        }
        else{
            alert("Debe escribir un nombre para poder guardar")
        }
    }


    const handleChangeHorario = (dia,hora) =>{
        let newHorario = horario
        let sumaHorasLaborales = parseInt(hora.split(":")[0]) + 8
        let horaSalida = sumaHorasLaborales.toString()+":"+hora.split(":")[1]
        newHorario[dia]={ingreso:hora, salida:horaSalida}
        setHorario(newHorario);
    }
    
    return(
        <li className="new-table-row" >
            <div className="col0"><input type="text" value={nombre} onChange={(e)=>{setNombre(e.target.value)}} placeholder="Nombre ..."/></div>
            <div className="col1"><input type="time" onChange={(e)=>{handleChangeHorario("lunes",e.target.value)}}/></div>
            <div className="col1"><input type="time" onChange={(e)=>{handleChangeHorario("martes",e.target.value)}}/></div>
            <div className="col1"><input type="time" onChange={(e)=>{handleChangeHorario("miercoles",e.target.value)}}/></div>
            <div className="col1"><input type="time" onChange={(e)=>{handleChangeHorario("jueves",e.target.value)}}/></div>
            <div className="col1"><input type="time" onChange={(e)=>{handleChangeHorario("viernes",e.target.value)}}/></div>
            <div className="col1"><input type="time" onChange={(e)=>{handleChangeHorario("sabado",e.target.value)}}/></div>
            <div className="col1"><input type="time" onChange={(e)=>{handleChangeHorario("domingo",e.target.value)}}/></div>
            <div className="col2"><div className="añadir" onClick={()=>savePersona()}>+</div></div>
        </li>
    )
}


const Planificador = (props) => {

    const isFree = (ingreso,salida) =>{
        if(ingreso === undefined && salida === undefined){
           return "LIBRE"
        }
        return `${ingreso}h - ${salida}h`
    }
    const deleteRow = (id) =>{
        let newPersonas = props.personas
        newPersonas = newPersonas.filter(persona => persona.id!==id)
        props.setPersonas(newPersonas)
    }

    const RenderRows = props.personas.map((persona)=>{
        console.log(persona)
        return(
            <li className="table-row" key={persona.id}>
                <div className="col1"><button onClick={()=>{deleteRow(persona.id)}}>x</button></div>
                <div className="col0">{persona.nombre}</div>
                <div className="col1">{isFree(persona.lunes.ingreso,persona.lunes.salida)}</div>
                <div className="col1">{isFree(persona.martes.ingreso,persona.martes.salida)}</div>
                <div className="col1">{isFree(persona.miercoles.ingreso,persona.miercoles.salida)}</div>
                <div className="col1">{isFree(persona.jueves.ingreso,persona.jueves.salida)}</div>
                <div className="col1">{isFree(persona.viernes.ingreso,persona.viernes.salida)}</div>
                <div className="col1">{isFree(persona.sabado.ingreso,persona.sabado.salida)}</div>
                <div className="col1">{isFree(persona.domingo.ingreso,persona.domingo.salida)}</div>
                <div className="col1">{persona.total}</div>
            </li>
            )
    })

    return ( 
        <div>
            <div className="TableView">
                <ul className="table-style">
                    <li className="table-header">
                        <div className="col1"></div>
                        <div className="col0">Nombre</div>
                        <div className="col1">Lunes</div>
                        <div className="col1">Martes</div>
                        <div className="col1">Miercoles</div>
                        <div className="col1">Jueves</div>
                        <div className="col1">Viernes</div>
                        <div className="col1">Sabado</div>
                        <div className="col1">Domingo</div>
                        <div className="col1">Total</div>
                    </li>
                </ul>
                <ul className="content-table-style">
                    {props.personas.length>0?RenderRows:<li className="table-row"></li>}
                </ul>
                <ul className="content-table-style">
                    <CreateNewPersona
                        setPersonas = {props.setPersonas}
                        personas = {props.personas}
                        forceUpdate={props.forceUpdate}
                    />
                </ul>
            </div>
        </div>
     );
}
 
export default Planificador;