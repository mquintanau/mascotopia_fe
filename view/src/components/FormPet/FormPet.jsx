const FormPet = () => {
    return (  
        <div>
      {/* Botón para mostrar/ocultar el formulario */}
      <Button className="text-bold mx-[200px] mt-[30px] text-black" onClick={toggleForm}>
        Agregar Datos
      </Button>
      
      {/* Renderiza el formulario si showForm es true */}
      {showForm && (
        <form>
          {/* Aquí coloca los campos del formulario */}
          <label>
            Nombre:
            <input type="text" />
          </label>
          {/* Otros campos del formulario */}
          
          <button type="submit">Guardar</button>
        </form>
      )}
    </div>
    );
}
 
export default FormPet;