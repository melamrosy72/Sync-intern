// for edit modal
$(document).ready(function () {
    $('#editModal').on('show.bs.modal', function (event) {
        const modal = $(this);
        const link = $(event.relatedTarget); // Get the clicked "Edit" button
        const id = link.data('id')

        // Handle the save changes button click
        modal.find('#editUserButton').on('click', function () {
            let updatedData = {};

            const newPosition = modal.find('#editPosition').val();
            if (newPosition) {
                updatedData.newPosition = newPosition;
            }

            // Send the updated data to the server using Axios
            axios.patch(`http://localhost:4000/users/user/${id}`, updatedData)
                .then(function (response) {
                    // Handle the successful response, e.g., close the modal
                    window.location.reload();
                    modal.modal('hide');
                })
                .catch(function (error) {
                    // Handle errors, e.g., display an error message to the user
                    console.error(error);
                });
        });
    });
});

// Add an event listener to the confirm delete button
document.getElementById('confirmDeleteButton').addEventListener('click', function () {
    // Extract the user ID from the data attribute
    const id = $(this).data('id');

    // Send the delete request to the server using Axios
    axios.delete(`http://localhost:4000/users/delete/${id}`)
        .then(function (response) {
            // Handle successful deletion here (e.g., display a success message)
            console.log(response.data.message);
            window.location.reload();
            $('#deleteModal').modal('hide');
        })
        .catch(function (error) {
            // Handle errors (e.g., display an error message)
            console.error(error.response.data.error);
        });
});

// Add an event listener to open the delete modal when the user clicks the delete button
$('#keywords tbody').on('click', 'a[data-toggle="modal"][data-target="#deleteModal"]', function () {
    const id = $(this).data('id');

    // Set the user ID in the data attribute of the confirm delete button
    $('#confirmDeleteButton').data('id', id);
});
