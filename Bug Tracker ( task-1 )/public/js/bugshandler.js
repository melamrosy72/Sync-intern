
// handling view  details
$(document).ready(function () {
    $('#viewModal').on('show.bs.modal', function (event) {
        const modal = $(this);
        const link = $(event.relatedTarget); // Get the clicked "View" icon link
        const description = link.data('description'); // Get the description from data attribute
        const responsible = link.data('responsible')
        // Populate the modal with the description
        modal.find('.modal-body .description').text(description);
        modal.find('.modal-body .responsible').text(responsible);
    });
});

// handling editing 
$(document).ready(function () {
    $('#editModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget); // Get the button that triggered the modal
        const id = button.data('id'); // Retrieve the data-id attribute from the button
        const modal = $(this);
        // const id = modal.data('id');
        modal.find('#editBugButton').on('click', function () {
            let updatedData = {};

            const newTitle = modal.find('#editTitle').val();
            if (newTitle) {
                updatedData.title = newTitle;
            }
            const newPriority = modal.find('#editPriority').val();
            if (newPriority) {
                updatedData.priority = newPriority;
            }

            const newFixed = modal.find('#editFixed').val();
            if (newFixed) {
                updatedData.fixed = newFixed;
            }

            const newDescription = modal.find('#editDescription').val();
            if (newDescription) {
                updatedData.description = newDescription;
            }

            const newResponsible = modal.find('#editResponsible').val();
            if (newResponsible) {
                updatedData.responsible = newResponsible;
            }
            console.log(id);
            axios.patch(`http://localhost:4000/bugs/bug/${id}`, updatedData)
                .then(function (response) {
                    console.log(response.data.message);
                    console.log(id);
                    modal.modal('hide');
                    window.location.reload();
                })
                .catch(function (error) {
                    console.error(error);
                });
        });
    });
});

// handling delete button confirmation 
$(document).ready(function () {
    $('#keywords tbody').on('click', 'a[data-toggle="modal"][data-target="#deleteModal"]', function () {
        const id = $(this).data('id');

        $('#confirmDeleteButton').data('id', id);
    });

    document.getElementById('confirmDeleteButton').addEventListener('click', function () {
        const id = $(this).data('id');

        axios.delete(`http://localhost:4000/bugs/delete/${id}`)
            .then(function (response) {
                console.log(response.data.message);
                window.location.reload();
                
                $('#deleteModal').modal('hide');
            })
            .catch(function (error) {
                console.error(error.response.data.error);
            });
    });
});
