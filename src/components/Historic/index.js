const Historic = props => {
    return (
        <div className="card">
            <div className="item">
                <div className="number">
                    <h4>{props.item.date}</h4>
                </div>
                <div className="type">
                    <h4>{props.item.user_name}</h4>
                </div>
                <div className="type">
                    <h4>{props.item.status}</h4>
                </div>
            </div>
        </div>
    )
}

export {Historic}
