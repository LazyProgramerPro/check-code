export interface ChangePasswordFormAction {
  type: string;
  visible: boolean;
}

// Const
export const SHOW_FORM_CHANGE_PASSWORD = 'SHOW_FORM_CHANGE_PASSWORD';
export const HIDE_FORM_CHANGE_PASSWORD = 'HIDE_FORM_CHANGE_PASSWORD';

export const showChangePasswordForm = (request?: any): ChangePasswordFormAction => ({
  type: SHOW_FORM_CHANGE_PASSWORD,
  visible: true,
});

export const hideChangePasswordForm = (): ChangePasswordFormAction => ({
  type: HIDE_FORM_CHANGE_PASSWORD,
  visible: false,
});
