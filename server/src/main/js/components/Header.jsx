import * as React from 'react';
import { Badge } from "@mantine/core";

function Header() {
    return (
        <header>
            <div className="content-desktop">
                <div>
                    <Badge size="lg" color="green">GreenZone</Badge>
                </div>
            </div>

            <div className="content-mobile">

            </div>
        </header>
    );
}

export default Header;
