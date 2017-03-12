import * as React from 'react'

interface System {
    import<T>(request: string): Promise<T>
}
declare var System: System

import LazilyLoad from './lib/LazyLoader'

const importLazy = (promise: Promise<any>) => promise
    .then(result =>
        result.default,
    )

export const LazyPage: React.StatelessComponent<{}> = () => {
    return (
        <LazilyLoad
            clientModule={() =>
                importLazy(System.import('./components/Demo'))
            }
            serverModule="./common/components/Demo"
            renderComponent={Loaded => (
                <Loaded />
            )}
        />
    )
}
