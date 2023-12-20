const Loader = () => {
    return <>
        <div className="d-flex align-items-center">
            <div className="spinner-border" style={{width: '1.5rem', height: '1.5rem'}} role="status" aria-hidden="true"></div>
            <strong className="ms-2">Loading...</strong>
        </div>
    </>
}

export default Loader;