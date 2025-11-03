# Test Connection Improvements

## Overview
Fitur test connection telah diperbaiki dan ditingkatkan untuk memberikan feedback yang lebih informatif dan error handling yang lebih baik saat menguji koneksi SSH dan Token authentication ke GitHub.

## Perubahan yang Dilakukan

### 1. Peningkatan di `src/flows.ts` - `testConnectionFlow()`

#### SSH Connection Testing
- **Validasi SSH Key**: Sekarang memeriksa apakah SSH key exists sebelum melakukan test
- **Error Messages yang Lebih Informatif**: 
  - Menampilkan pesan sukses dengan ikon ✓
  - Menampilkan pesan error dengan ikon ✗
  - Memberikan panduan troubleshooting jika test gagal
  - Menampilkan instruksi untuk menambahkan SSH key ke GitHub

#### Token Authentication Testing
- **Validasi Input**: Memastikan username dan token tersedia
- **Error Handling yang Lebih Baik**: Menangkap dan menampilkan error dengan detail
- **Panduan Troubleshooting**: Memberikan checklist untuk memecahkan masalah token authentication

#### Contoh Output Perbaikan:

**SSH Test Berhasil:**
```
✓ SSH connection test passed!
Authenticated successfully to github.com

Details: Successfully authenticated as username
```

**SSH Test Gagal:**
```
✗ SSH connection test failed!
Make sure your SSH key is added to GitHub:
1. Copy your public key:
   cat ~/.ssh/id_ed25519.pub
2. Add it to GitHub at: https://github.com/settings/keys

Details: Connection failed. Check if SSH key is added to GitHub.
```

**Token Test Berhasil:**
```
✓ Token authentication test passed!
Successfully authenticated as username

Details: HTTP 200 - Authentication successful
```

**Token Test Gagal:**
```
✗ Token authentication test failed!
Please check:
• Token has not expired
• Token has correct permissions (repo access)
• Username is correct

Create a new token at: https://github.com/settings/tokens

Details: HTTP 401 - Invalid credentials. Check your username and token.
```

### 2. Peningkatan di `src/ssh.ts` - `testSshConnection()`

#### Validasi Host Alias
- Memeriksa apakah `hostAlias` kosong atau undefined
- Return error message jika host alias tidak valid

#### Error Handling yang Lebih Baik
- Menggunakan try-catch untuk menangkap semua error
- Memberikan pesan error yang lebih deskriptif berdasarkan exit code
- Exit code 255 mengindikasikan masalah koneksi SSH

#### Parsing Response GitHub
- Ekstrak username dari response GitHub ("Hi username!")
- Menampilkan pesan sukses dengan nama user yang ter-autentikasi

#### SSH Options yang Ditingkatkan
- Menambahkan `-o BatchMode=yes` untuk mencegah interactive prompts
- Tetap menggunakan `StrictHostKeyChecking=no` untuk kemudahan
- Timeout 10 detik untuk mencegah hanging

### 3. Peningkatan di `src/git.ts` - `testTokenAuth()`

#### Validasi Input
- Memeriksa apakah username dan token tidak kosong
- Return error message jika input tidak valid

#### HTTP Status Code Handling
- **200**: Sukses - "Authentication successful"
- **401**: Unauthorized - "Invalid credentials. Check your username and token."
- **403**: Forbidden - "Access forbidden. Token may lack required permissions."
- **404**: Not Found - "Not found. Check your username."
- **000 atau kosong**: "Connection failed. Check your network connection."

#### Error Handling Komprehensif
- Try-catch untuk menangkap network errors
- Menampilkan pesan error yang informatif
- Memberikan context untuk debugging

## Cara Menggunakan

### Test SSH Connection
```bash
bun run index.ts
# Pilih menu: Test Connection
# Pilih account yang ingin ditest
# Pilih method: SSH
```

### Test Token Authentication
```bash
bun run index.ts
# Pilih menu: Test Connection
# Pilih account yang ingin ditest
# Pilih method: Token
```

## Troubleshooting Guide

### SSH Connection Issues

#### Problem: "SSH key not found"
**Solution:**
1. Cek path SSH key di konfigurasi account
2. Generate SSH key baru jika perlu
3. Pastikan permissions benar (600 untuk private key)

#### Problem: "Connection failed"
**Solution:**
1. Pastikan SSH key sudah ditambahkan ke GitHub:
   - Copy public key: `cat ~/.ssh/id_ed25519.pub`
   - Add ke GitHub: https://github.com/settings/keys
2. Test manual: `ssh -T git@github.com`
3. Cek SSH config: `cat ~/.ssh/config`

#### Problem: "Permission denied (publickey)"
**Solution:**
1. Cek permissions file key: `chmod 600 ~/.ssh/id_ed25519`
2. Cek permissions directory: `chmod 700 ~/.ssh`
3. Pastikan public key sudah di-copy ke GitHub dengan benar

### Token Authentication Issues

#### Problem: "HTTP 401 - Invalid credentials"
**Solution:**
1. Cek username GitHub (case-sensitive)
2. Pastikan token masih valid (belum expired)
3. Generate token baru jika perlu: https://github.com/settings/tokens

#### Problem: "HTTP 403 - Access forbidden"
**Solution:**
1. Token memerlukan scope/permissions yang tepat
2. Minimal permissions yang diperlukan:
   - `repo` (Full control of private repositories)
   - `read:user` (Read user profile data)
3. Generate token baru dengan permissions yang benar

#### Problem: "Connection failed"
**Solution:**
1. Cek koneksi internet
2. Cek apakah GitHub API accessible: `curl https://api.github.com`
3. Cek proxy settings jika menggunakan proxy

## Technical Details

### SSH Test Flow
1. Validate hostAlias tidak kosong
2. Execute `ssh -T git@{hostAlias}` dengan options:
   - `-o StrictHostKeyChecking=no`: Auto accept host key
   - `-o ConnectTimeout=10`: Timeout setelah 10 detik
   - `-o BatchMode=yes`: No interactive prompts
3. Parse output untuk mendeteksi sukses/gagal
4. Extract username dari response GitHub
5. Return result dengan status dan message

### Token Test Flow
1. Validate username dan token tidak kosong
2. Execute curl ke GitHub API endpoint `/user`
3. Use Basic Auth dengan username:token
4. Parse HTTP status code dari response
5. Map status code ke pesan error yang sesuai
6. Return result dengan status dan message

## Benefits

1. **User Experience Lebih Baik**: Pesan yang jelas dan actionable
2. **Debugging Lebih Mudah**: Error messages yang detail membantu identifikasi masalah
3. **Panduan Inline**: User mendapat instruksi langsung untuk memperbaiki masalah
4. **Robust Error Handling**: Menangani semua edge cases dan unexpected errors
5. **Informative Feedback**: Menampilkan detail sukses/gagal dengan context yang cukup

## Future Improvements

- [ ] Add retry mechanism untuk network failures
- [ ] Cache test results untuk menghindari redundant tests
- [ ] Add verbose mode untuk debugging
- [ ] Support untuk test multiple accounts sekaligus
- [ ] Integration test automated untuk CI/CD
- [ ] Add timeout configuration untuk slow networks
- [ ] Support untuk GitHub Enterprise custom domains

## Related Files

- `src/flows.ts` - Main test connection flow
- `src/ssh.ts` - SSH connection testing logic
- `src/git.ts` - Token authentication testing logic
- `src/utils/ui.ts` - UI components untuk display

## Version History

- **v1.0.0** (2024): Initial test connection feature
- **v2.0.0** (Current): Enhanced error handling dan user feedback improvements