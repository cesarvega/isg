import { ChildEntity } from "src/app/frontier/utils/store/interfaces/quote";
import { CustomizationsMapper } from "./customizations-mapper";

export class GetActiveCustomizations extends CustomizationsMapper {

    getActiveCustomizations(customizations) {

        let activeCustomizations = this.activeCustomizationsHelper(customizations, null, [])
        return activeCustomizations;

    }

    activeCustomizationsHelper(customizations, parent, activeCustomizations) {
        for (let customization of customizations) {
            if (parent) {
                if (this.hasAction(customization) && !this.hasAction(parent) && !this.isUnusedCustomization(parent)) {
                    parent.isContainer = true;
                    customization.hasAction = true;
                    if (this.isCustomizationActive(customization)) {
                        activeCustomizations.push(customization);
                    }
                }
            }
            if (this.isUnusedCustomization(customization)) {
                customization.hasAction = false;
            }
            if (this.hasChildren(customization)) {
                this.activeCustomizationsHelper(customization.ChildEntity, customization, activeCustomizations);
            }
        }
        return activeCustomizations;
    }

    isCustomizationActive(customization: ChildEntity) {
        return customization.Active === true
    }
}