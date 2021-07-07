import React,{useState,} from 'react';
import './Planificador.css'
import { v4 as uuidv4 } from 'uuid';

const CreateNewPersona = ({setPersonas,personas,forceUpdate}) =>{
    const [nombre,setNombre] = useState()
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
        console.log(newPersonas)
        forceUpdate()
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
            <div className="col0"><input type="text" onChange={(e)=>{setNombre(e.target.value)}} placeholder="Nombre ..."/></div>
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

    const RenderRows = props.personas.map((persona,index)=>{
        return(
            <li className="table-row" key={index}>
                <div className="col0">{persona.nombre}</div>
                <div className="col1">{persona.lunes.ingreso} AM -{persona.lunes.salida} PM</div>
                <div className="col1">{persona.martes.ingreso} AM -{persona.martes.salida} PM</div>
                <div className="col1">{persona.miercoles.ingreso} AM -{persona.miercoles.salida} PM</div>
                <div className="col1">{persona.jueves.ingreso} AM -{persona.jueves.salida} PM</div>
                <div className="col1">{persona.viernes.ingreso} AM -{persona.viernes.salida} PM</div>
                <div className="col1">{persona.sabado.ingreso} AM -{persona.sabado.salida} PM</div>
                <div className="col1">{persona.domingo.ingreso} AM -{persona.domingo.salida} PM</div>
                <div className="col1">{persona.total}</div>
            </li>
            )
    })

    return ( 
        <div>
            <div className="TableView">
                <ul className="table-style">
                    <li className="table-header">
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