export default function WaitingButton({defaultText, waitingText, clickHandler, waiting, spacing}) {
    let buttonContent = "none";

    if(!waiting) {
        buttonContent = defaultText;
    } else {
        buttonContent = (
            <>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>{ " "+waitingText }</span>
            </>
        );
    }

    let buttonStyleClass = ["btn", "btn-primary"];
    buttonStyleClass = buttonStyleClass.concat(spacing);

    return (
        <button type="button" className={buttonStyleClass.join(" ")} onClick={clickHandler} disabled={waiting}>
            {buttonContent}
        </button>
    );
}