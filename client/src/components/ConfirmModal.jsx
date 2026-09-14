function ConfirmModal({

    title = "Confirm Action",

    message = "Are you sure you want to continue?",

    confirmText = "Delete",

    cancelText = "Cancel",

    onConfirm,

    onCancel

}) {


    return (


        <div className="modal-overlay">


            <dialog className="confirm-modal" open aria-labelledby="confirm-title">



                <h2 id="confirm-title">

                    {title}

                </h2>





                <p>

                    {message}

                </p>







                <div className="modal-actions">



                    <button

                        className="modal-cancel-btn"

                        onClick={onCancel}

                    >

                        {cancelText}


                    </button>








                    <button

                        className="modal-confirm-btn"

                        onClick={onConfirm}

                    >

                        {confirmText}


                    </button>




                </div>



            </dialog>



        </div>


    );


}


export default ConfirmModal;