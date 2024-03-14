import { libraryChoices } from '@/utils/constants';
import { useUser } from '@/context/user-context';
import { IconMarket } from './icons';
import { ElemDropdown } from './elem-dropdown';

const ElemLibrarySelector = () => {
  const { selectedLibrary, onChangeLibrary } = useUser();

  if (!selectedLibrary) {
    return null;
  }

  const libraryItems = libraryChoices?.map((libraryTag, index) => {
    const selectedIconClass =
      libraryTag.name === 'Web3'
        ? 'text-primary-500'
        : libraryTag.name === 'AI'
        ? 'text-pink-25'
        : '';

    const itemPill =
      libraryTag.name === 'Web3' ? null : (
        <div className="px-3 py-1 text-xs font-medium rounded-full shrink-0 bg-pink-25/15 text-pink-25">
          New
        </div>
      );

    return {
      id: index,
      label: `${libraryTag.name}`,
      value: `${libraryTag.name}`,
      Icon: IconMarket,
      selectedIconClass: selectedIconClass,
      Pill: itemPill,
      onClick: () => onChangeLibrary(libraryTag),
    };
  });

  return (
    <ElemDropdown
      ButtonIcon={IconMarket}
      buttonIconClass={
        selectedLibrary === 'Web3' ? 'text-primary-500' : 'text-pink-25'
      }
      buttonClass={`w-full ${
        selectedLibrary === 'Web3' ? 'border-primary-500' : 'border-pink-25'
      }`}
      panelClass="w-full lg:w-auto"
      defaultItem={libraryItems.findIndex(
        libraryItem => libraryItem.value === selectedLibrary,
      )}
      items={libraryItems}
    />
  );
};

export default ElemLibrarySelector;
