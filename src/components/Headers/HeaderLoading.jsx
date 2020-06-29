import ReactLoading from "react-loading";
import React from "react";

export function HeaderLoading(props) {
    return (
        <div className={'container-flex'}>
            <ReactLoading color={'#afdae3'} type={'spinningBubbles'} height={'5%'} width={'5%'} />
        </div>
    );
}
