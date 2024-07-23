import PropTypes from 'prop-types';

export const Person = ({ id, name, role, img, handleEdit, handleDelete }) => {
  return (
    <div className='col mt-4'>
      <div className='card' style={{width: "18rem"}}>
        <img className='card-img-top' src={img} alt={name} />
        <div className='card-body'>
          <h4 className='card-title'>{name}</h4>
          <p className='card-text'>{role}</p>
        </div>
        <div className='container mb-4 text-center'>
          <button className='btn btn-success me-2' onClick={handleEdit}>Editar</button>
          <button className='btn btn-danger'  data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => handleDelete(id)}>Eliminar</button>
        </div>
      </div>
    </div>
  )
}

Person.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func
}