import React from 'react';
import {Label, GrupoInput, LeyendaError,Input, IconoValidacion} from '../elementos/DatosFormularios';
import { faBan, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

const Ingresos = ({type, name, label,placeholder,leyendaError,expresionRegular,id,estado,cambiarEstado}) => {
    const onChange = (e)=>{
        cambiarEstado({...estado,campo:e.target.value});
    }
    const validacion =() =>{
        if(expresionRegular){
            if(expresionRegular.test(estado.campo)){
                cambiarEstado({...estado, valido:'true'});
            }else{
                cambiarEstado({...estado, valido:'false'});
            }
        }
    }
    return (
        <div>
            <Label htmlFor={name} valido={estado.valido}>{label}</Label>
            <GrupoInput>
                <Input 
                    className="control" 
                    type={type} 
                    id={id} 
                    placeholder={placeholder} 
                    value={estado.campo} 
                    onChange={onChange}
                    onKeyUp={validacion}
                    onBlur={validacion}
                    valido={estado.valido}
                />
                <IconoValidacion icon={estado.valido==='true'? faCheckSquare: faBan} valido={estado.valido}/>
            </GrupoInput>
            <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
        </div>
    );
}

export default Ingresos;