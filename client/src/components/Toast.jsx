function Toast({ message, type }) {


    if (!message) {

        return null;

    }



    return (

        <div className={`toast ${type}`} role="status" aria-live="polite">

            {message}

        </div>

    );

}


export default Toast;