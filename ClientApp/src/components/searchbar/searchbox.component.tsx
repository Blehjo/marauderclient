export const SearchBox = (props: any) => (
  <input
    style={{ margin: "2rem", width: "87%", padding: "1rem", borderRadius: ".5rem", color: "white", background: "black", border: 'white 1px solid' }}
    className='search-box'
    type='search'
    placeholder='Search'
    onChange={props.onSearchChange}
  />
);