import {TransformerInclude} from '@/types/Requests/ResponseTemplate';

export interface PlaceIndexResponse {
  name: string
  description: string
  distance?: number
  guidebook_category_id?: number
  guidebook_category_text?: string
  longitude: string
  latitude: string
  guidebook: TransformerInclude<GuidebookRes>
}

export interface GuidebookRes {
  id: number
  name: string
  icon: string
  lang: string
}