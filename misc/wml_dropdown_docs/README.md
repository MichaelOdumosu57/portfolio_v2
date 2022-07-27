# Ovewview

* there should be 3 types of options
  select, autocomplete, option, noSelect

__select__ means it has a dropdown but you cant edit the item
__automcomplete__ means it has a dropdown and you can edit the item for different results
__option__ does not have a dropdown and updates a select or autocomplete by clicking
__noSelect__ - an option that does not have a dropdown and has no select as well

you can specify any position of how the dropdown opens up and how the dropdown icons arrange

becuase of css and we dont want fixed position there are 2 positions that you can place the option and its dropdown
optionFirst and dropdownFirst
the dropdown is opened by the first elemement



wml-dropdown
attachRootInformationToChildren - attached the root dropdown, root option and communicateRootSubj to all child options

attachParentInformationToChildren - attach parent dropdown, parent option and communicateParentSubj to all child option

# References
* https://www.codingnepalweb.com/animated-drop-down-menu-bar-html-css/


# Issues 
* change detection seems not to be working with the dropdown children
* in unit test showInitalOptionAndSetAsRoot and showDropdown is needed or the component breaks with expression chnaged after checked error
