const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white"
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white"
		  }
		],
		agendas: [],
		contacts: [],
	  },
	  actions: {
		createAgenda: async (agendaName) => {
			try {
			  const response = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify({
				  full_name: "",
				  email: "",
				  agenda_slug: agendaName, 
				  address: "",
				  phone: "",
				}),
			  });
			  const data = await response.json();
			  console.log("Agenda creada:", data);
			  actions.loadAgendas();
			} catch (error) {
			  console.error("Error al crear la agenda:", error);
			}
		  },		  
		loadAgendas: async () => {
		  try {
			const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda");
			const data = await response.json();
			setStore({ agendas: data });
		  } catch (error) {
			console.error("Error al cargar las agendas desde la API:", error);
		  }
		},
		loadAgendaUser: async agendaSlug => {
			try {
			  const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/${agendaSlug}`);
			  if (!response.ok) {
				throw new Error("No se pudo cargar la agenda");
			  }
			  const data = await response.json();
			  return data; 
			} catch (error) {
			  console.error("Error al cargar los datos de la agenda:", error);
			  throw error;
			}
		  },
		  createContact: async newContact => {
			try {
			  // Realiza una solicitud POST para crear un nuevo contacto en la API
			  const response = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
				method: "POST",
				headers: {
				  "Content-Type": "application/json"
				},
				body: JSON.stringify(newContact)
			  });
	
			  if (!response.ok) {
				throw new Error("Error al crear el contacto");
			  }
	
			  // Obtén los datos del nuevo contacto creado
			  const data = await response.json();
	
			  // Actualiza el estado de la tienda para reflejar el nuevo contacto
			  setStore({ contacts: [...getStore().contacts, data] });
			} catch (error) {
			  console.error("Error al crear el contacto:", error);
			}
		  },
  		  
		  loadEditContact: async (contactId, updatedContact) => {
			try {
			const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, {
				method: 'PUT',
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedContact),
			});
			const data = await response.json();
			console.log('Contacto editado:', data);
			} catch (error) {
			console.error('Error al editar el contacto:', error);
			 }
			},
  
		  deleteContact: async contactId => {
			try {
			  const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, {
				method: 'DELETE'
			  });
	
			  if (!response.ok) {
				throw new Error('Error al eliminar el contacto');
			  }
	
			} catch (error) {
			  console.error('Error al eliminar el contacto:', error);
			}
		  }
		}
	  };
	};
	
	export default getState;
