export const SearchBox = (props: any) => (
  <input
    style={{ margin: ".5rem", width: "97%", padding: "1rem", borderRadius: ".5rem", color: "white", background: "black" }}
    className='search-box'
    type='search'
    placeholder='Search'
    onChange={props.onSearchChange}
  />
);