import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';

@Injectable()
export class AuthOtpService {
  async generateSecret(): Promise<string> {
    return authenticator.generateSecret();
  }

  async verifyOTP(secret: string, otp: string): Promise<boolean> {
    try {
      return authenticator.check(otp, secret);
    } catch (error) {
      return false;
    }
  }

  async generateUrl(email: string, secret: string): Promise<string> {
    return authenticator.keyuri(email, 'ViVi', secret);
  }
}
