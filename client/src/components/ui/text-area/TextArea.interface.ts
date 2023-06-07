import { TextareaHTMLAttributes } from 'react';
import { IFieldProps } from '../fields/Fields.interface';

type InputPropsField = TextareaHTMLAttributes<HTMLTextAreaElement> & IFieldProps

export interface ITextArea extends InputPropsField { }