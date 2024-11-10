/*import React, { useState } from 'react'
import axios from 'axios'

function Create() {
    const [task,setTask] = useState('')
    const handleAdd = () => {
        axios.post('http://localhost:3001/add', {task: task})
        .then(result => {
          location.reload()
        })
        .catch(err =>console.log(err))
    }
  return (
    <div className='create_form'>
        <input type="text" placeholder='Enter Task' onChange={(e) => setTask(e.target.value)}/>
        <button type="button" onClick={handleAdd}>Add </button>
      
    </div>
  )
}

export default Create
*/


// this one doesn't allow access to the devices on the local network (can't add tasks or delete Crud operations )
/*import React, { useState } from 'react'
import axios from 'axios'

function Create() {
    const [task, setTask] = useState('')

    const handleAdd = () => {
        axios.post('http://localhost:3001/add', { task: task })
            .then(result => {
                location.reload()
            })
            .catch(err => console.log(err))
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd()
        }
    }

    return (
        <div className='create_form'>
            <input
                type="text"
                placeholder='Enter Task'
                onChange={(e) => setTask(e.target.value)}
                onKeyPress={handleKeyPress} // Listen for the key press event
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    )
}

export default Create
*/



//this one doesn't allow press enter bottom 

/*
import React, { useState } from 'react'
import axios from 'axios'

function Create() {
    const [task, setTask] = useState('')
    const handleAdd = () => {
        axios.post('http://192.168.1.14:3001/add', { task: task })
            .then(result => {
                location.reload()
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='create_form'>
            <input type="text" placeholder='Enter Task' onChange={(e) => setTask(e.target.value)} />
            <button type="button" onClick={handleAdd}>Add </button>
        </div>
    )
}

export default Create

*/



import React, { useState } from 'react'
import axios from 'axios'

function Create() {
    const [task, setTask] = useState('')

    const handleAdd = () => {
        axios.post('http://localhost:3001/add', { task: task })
            .then(result => {
                location.reload()
            })
            .catch(err => console.log(err))
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd()
        }
    }

    return (
        <div className='create_form'>
            <input
                type="text"
                placeholder='Enter Task'
                onChange={(e) => setTask(e.target.value)}
                onKeyPress={handleKeyPress} // Listen for the key press event
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    )
}

export default Create


