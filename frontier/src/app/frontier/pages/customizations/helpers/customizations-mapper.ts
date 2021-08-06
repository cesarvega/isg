import { ChildEntity } from "src/app/frontier/utils/store/interfaces/quote";
import { unsuedCustomizations } from "./unused-customizations";

export class CustomizationsMapper {

    mapCustomsizations(customizations): ChildEntity[] {
        this.mapHelper(customizations, null)
        return customizations;

    }

    mapHelper(customizations, parent) {
        for (let customization of customizations) {
            if (parent) {
                if (this.hasAction(customization) && !this.hasAction(parent) && !this.isUnusedCustomization(parent)) {
                    parent.isContainer = true;
                    customization.hasAction = true;
                }
            }
            if (this.isUnusedCustomization(customization)) {
                customization.hasAction = false;
            }
            if (this.hasChildren(customization)) {
                this.mapHelper(customization.ChildEntity, customization);
            }
        }
    }



    isUnusedCustomization(customization: ChildEntity) {
        return unsuedCustomizations.includes(customization.Name)
    }


    hasAction(childEntity) {
        return (childEntity.hasOwnProperty("Active") || childEntity.hasOwnProperty("ConfiguredValue"))
    }

    hasOptionsToSelect(childEntity) {
        return parseInt(childEntity.maximumActiveChildEntities) > 0

    }

    hasChildren(childEntity) {
        return childEntity.hasOwnProperty("ChildEntity");
    }

}