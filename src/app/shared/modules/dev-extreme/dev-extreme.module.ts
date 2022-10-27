import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxMenuModule,
  DxTextBoxModule,
  DxValidatorModule,
  DxButtonModule,
  DxLoadPanelModule,
  DxDropDownBoxModule,
  DxDataGridModule,
  DxPopupModule,
  DxCheckBoxModule,
  DxDateBoxModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxTooltipModule,
  DxFileUploaderModule,
  DxSchedulerModule,
  DxFormModule,
  DxValidationSummaryModule,
  DxTagBoxModule,
  DxFilterBuilderModule,
  DxTreeListModule,
  DxSwitchModule,
  DxNumberBoxModule,
  DxTabPanelModule,
  DxRadioGroupModule,
  DxListModule,
} from 'devextreme-angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    DxMenuModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxButtonModule,
    DxLoadPanelModule,
    DxDropDownBoxModule,
    DxDataGridModule,
    DxPopupModule,
    DxCheckBoxModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxTooltipModule,
    DxFileUploaderModule,
    DxSchedulerModule,
    DxFormModule,
    DxValidationSummaryModule,
    DxTagBoxModule,
    DxFilterBuilderModule,
    DxTreeListModule,
    DxSwitchModule,
    DxNumberBoxModule,
    DxTabPanelModule,
    DxRadioGroupModule,
    DxListModule
  ],
})
export class DevExtremeModule { }
