import React from 'react';
import { render } from '@testing-library/react';
import { Tile } from './Tile';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

it('renders with adjacent bombs', () => {
   const tile = render(
        <Provider store={store}>
            <Tile flagged={false} revealed={true} row={0} col={0} adjacentBombs={2} />
        </Provider>
   );
   expect(tile.getByRole('button')).toHaveTextContent('2')
});
