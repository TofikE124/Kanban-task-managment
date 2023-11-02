interface Props {
  children: React.ReactNode;
}
const Dropdown = ({ children }: Props) => {
  return <div className="dropdown">{children}</div>;
};

export default Dropdown;

// Example
{
  /* 
<DropdownContainer onChange={(value) => console.log(value)}>
  <DropdownTitle>Dropdown</DropdownTitle>
  <Dropdown>
    <DropdownOption defaultOption>Todo</DropdownOption>
    <DropdownOption>Doing</DropdownOption>
    <DropdownOption>Done</DropdownOption>
  </Dropdown>
</DropdownContainer> 
*/
}
