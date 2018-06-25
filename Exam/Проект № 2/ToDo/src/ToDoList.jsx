import React, { Component as C } from 'react';
import moment from 'moment';
const ToDo = (props) => (
	<div>
		<br/>
		<input type="checkbox" id={"check"+props.id} />{props.str}	
		<br/>
	</div>
);

class ToDoList extends C {
    constructor() {
        super();  
        this.state={
            "todo":[]
        };
        
        fetch('http://localhost:4321/getlist')
        .then(response => response.json())
        .then(data => {
            this.setState(data);
            
        });  
      }
     
    addNew (){       
        let id=1;
        const length=this.state.todo.length
        if (length>0){
            id=this.state.todo[length-1].id+1;
        }
        const task={
            id: id,
            title: this.refs.newTask.value,
            time: moment().format('DD/MM/YYYY h:mm')
        }
        this.state.todo.push(task);
        this.refs.newTask.value="";        
        fetch('http://localhost:4321/update?body='+JSON.stringify(this.state))
        .then(response => response.json())
        .then(data => this.setState(data));           
    }
    DeleteTasks()
    {
        let newindex=1;
        let newmas=[];
        for (let index = 0; index < this.state.todo.length; index++) {
            const element = this.state.todo[index];
            if (document.getElementById("check"+element.id).checked==false){
                const task={
                    id: newindex,
                    title: element.title,
                    time: element.time
                }
                newmas.push(task);
                newindex++;
            }
            document.getElementById("check"+element.id).checked=false;
        }
        this.state.todo=newmas;
        fetch('http://localhost:4321/update?body='+JSON.stringify(this.state))
        .then(response => response.json())
        .then(data => this.setState(data));       
    }
    render() {
        return (
            <div>
                 {this.state.todo.map(task => <ToDo str={task.title} id={task.id} ref={"check"+task.id}/>)}
                 <input type="text" id="newTask" ref="newTask"/>  
                 <button onClick={() => this.addNew()}>Добавить задание</button> 
                 <button onClick={() => this.DeleteTasks()}>Удалить задания</button>                 
                
             </div>
             
            );
      }
}

export default ToDoList;

