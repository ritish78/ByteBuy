import React from 'react';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';

const BadgeToolTip = ({ toolTipMessage, badgeBackground, badgeMessage }) => {
    return (
        <OverlayTrigger
            placement='top'
            delay={{ show: 250, hide: 400}}
            overlay={
                        <Tooltip>
                            {toolTipMessage}
                        </Tooltip>
                    }
        >
            <Badge bg={badgeBackground} pill>{badgeMessage}</Badge>
        </OverlayTrigger>
    )
}

export default BadgeToolTip;