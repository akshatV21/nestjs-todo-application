import { SetMetadata } from '@nestjs/common'
import { AuthOptions } from '../utils/types'

export const Auth = (options: AuthOptions = {}) => {
  const metadata = {
    isOpen: options.isOpen ?? false,
    user: options.user ?? false,
  }
  return SetMetadata('authOptions', metadata)
}
