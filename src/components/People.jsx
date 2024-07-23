import PropTypes from 'prop-types';
import { Person } from './Person';
import { useState } from 'react';

export const People = ({ persons, setPersons }) => {

  // Estado para identificar a la persona que se está editando
  const [editingId, setEditingId] = useState(null);

  // Estado para guardar la persona eliminada
  const [personToDelete, setPersonToDelete] = useState(null);

  // Estado para guardar la persona que se editó
  const [editedPerson, setEditedPerson] = useState({
    name: '',
    role: '',
    img: ''
  });

  // Estado para establecer si se está editando o no
  const [isEditing, setIsEditing] = useState(false);

  // Método para capturar los datos desde el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPerson(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Método para crear una nueva persona
  const handleCreate = (e) => {
    // Evitar que el navegador se actualice
    e.preventDefault();

    setPersons([...persons, { id: persons.length +1, ...editedPerson }]);

    // Resetear la variable de estado de editedPerson
    setEditedPerson({  name: '', role: '', img: '' });
  };

  // Método para editar los datos de una persona
  const handleEdit = (id) => {

    // Establecer el ID de la persona a editar
    setEditingId(id);

    // Activar el estado de edición
    setIsEditing(true);

    // Buscar en el array la persona a editar
    const personToEdit = persons.find(person => person.id === id);

    setEditedPerson({ ...personToEdit });

  };

  // Método para actualizar los datos modificados
  const handleSave = (e) => {

    // Evitar que el navegador se actualice
    e.preventDefault();

    // Actualizar el estado de personas al guardar los datos modificados
    const updatePersons = persons.map(person => person.id === editingId ? editedPerson : person);

    // Actualizar los datos de la persona en el array
    setPersons(updatePersons);

    // Desactivar el estado de edición
    setIsEditing(false);

    // Resetear la variable de estado editing a null
    setEditingId(null);

    // Reseter la variable de estado editedPerson
    setEditedPerson({  name: '', role: '', img: '' });

  };

  // Métodos para eliminar a una persona del array

  // Obtener el id de la persona a eliminar del arreglo
  const handleDelete = (id) => {
    setPersonToDelete(id);
  }

  const confirmDelete = () => {
    setPersons(persons.filter(person => person.id !== personToDelete));
    setPersonToDelete(null);
  }

  const cancelDelete = () => {
    setPersonToDelete(null);
  }

  return (
    <div>
      <h2 className='text-center my-4'>IT Team</h2>
      <div className='container'>
        <div className='row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3'>
          {persons.map((person) => {
            return (
              <Person
                id={person.id}
                key={person.id}
                name={person.name}
                img={person.img}
                role={person.role}
                handleEdit={() => handleEdit(person.id)}
                handleDelete={handleDelete}
              />
            );
          })}
        </div>
      </div>
      {/* Formulario para crear o editar los datos de una persona*/}
      <div className='container mt-4'>
        <h2 className='text-center'>{isEditing ? 'Actualizar datos de la presona' : 'Crear nueva persona' }</h2>
        <form className='border boderder-dark rounded p-4'>
          <div>
            <label className='form-label'>Nombres</label>
            <input className='form-control' type="text" name="name" value={editedPerson.name} onChange={handleChange} required/>
          </div>
          <div>
            <label className='form-label'>Cargo</label>
            <input className='form-control' type="text" name="role" value={editedPerson.role} onChange={handleChange} required/>
          </div>
          <div>
            <label className='form-label'>Avatar</label>
            <input className='form-control' type="text" name="img" value={editedPerson.img} onChange={handleChange} required/>
          </div>
          <div className='mt-4'>
            <button className='btn btn-primary' type='submit' onClick={isEditing ? handleSave : handleCreate}>{isEditing ? 'Modificar' : 'Crear'}</button>
          </div>
        </form>
      </div>
      {/* Modal de confirmación de eliminación de persona */}
      <div id="deleteModal" className='modal fade' tabIndex="-1">
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Confirmar Eliminación</h4>
              <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close" onClick={cancelDelete}></button>
            </div>
            <div className='modal-body'>
              <p>¿Estás seguro de eliminar a {persons.find(person => person.id === personToDelete)?.name}</p>
            </div>
            <div className='modal-footer'>
              <button type="button" className='btn btn-secondary' data-bs-dismiss="modal" onClick={cancelDelete}>Cancelar</button>
              <button type="button" className='btn btn-danger' data-bs-dismiss="modal" onClick={confirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

People.propTypes = {
  persons: PropTypes.array,
  setPersons: PropTypes.func
}