import { useRouter } from 'next/navigation'
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"

export default function Page() {
  const router = useRouter()

  return (
    <Menubar>
      <MenubarMenu align="center" checked={true}>
        <MenubarTrigger>Prepare</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu align="center">
        <MenubarTrigger>Interview Questions</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  )
}
