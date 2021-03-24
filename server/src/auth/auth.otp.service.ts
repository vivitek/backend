import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';

@Injectable
export class AuthOtpService {
  constructor() {}

  async generateSecret(): string {
    return authenticator.generateSecret();
  }

  verifyOTP(secret: string, otp: string): boolean {
    try {
      return authenticator.check(otp, secret);
    } catch (error) {
      return false;
    }
  }
}
