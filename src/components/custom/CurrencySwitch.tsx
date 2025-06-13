import { Switch } from "../ui/switch";

interface CurrencySwitchProps {
    isChecked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

const CurrencySwitch = ({isChecked, onCheckedChange}: CurrencySwitchProps) => {
    return (
        <div className="flex justify-between items-center w-[100px] rounded-lg border-1 border-[#F1F1F4]">
          <img
            src={
              isChecked
                ? 'media/customIcons/Roubles.svg'
                : 'media/customIcons/RoublesActive.svg'
            }
            alt="COINS"
          />
          <Switch
            size="sm"
            id="auto-update"
            checked={isChecked}
            onCheckedChange={onCheckedChange}
            className="bg-[#F1F1F4] hover:bg-[#e8e8e8] data-[state=checked]:bg-[#e8e8e8]"
          />
          <img
            src={
              isChecked
                ? 'media/customIcons/CountsActive.svg'
                : 'media/customIcons/Counts.svg'
            }
            alt="Counts"
          />
        </div>
    )
}

export default CurrencySwitch;