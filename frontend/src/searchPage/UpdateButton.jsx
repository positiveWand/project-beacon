export default function UpdateButton({clickHandler, disabled}) {
    let buttonContent = "none";

    if(!disabled) {
        buttonContent = "업데이트";
    } else {
        buttonContent = (
            <>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>업데이트 중</span>
            </>
        );
    }
    return (
        <button type="button" className="btn btn-primary" onClick={clickHandler} disabled={disabled}>
            {buttonContent}
        </button>
    );
}