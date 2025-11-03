# Test Connection - Contoh Penggunaan

Dokumen ini menunjukkan contoh penggunaan fitur Test Connection yang telah diperbaiki.

## Skenario 1: Test SSH Connection - Berhasil

### Input
```bash
$ bun run index.ts
# Pilih: Test Connection
# Pilih account: work
# Pilih method: SSH
```

### Output
```
═══════════════════════════════════════════════════════════════
  Test Connection
═══════════════════════════════════════════════════════════════

? Choose account › 
  ● work (ACTIVE)
    john.doe@company.com • SSH, Token
  ○ personal
    personal@gmail.com • SSH, Token

? Test which authentication method? › 
❯ 🔑 SSH
  🔐 Token

⠋ Testing SSH connection...

✓ SSH connection test passed!
Authenticated successfully to github.com

Details: Successfully authenticated as johndoe

```

## Skenario 2: Test SSH Connection - Gagal (Key Belum di GitHub)

### Input
```bash
$ bun run index.ts
# Pilih: Test Connection
# Pilih account: newaccount
# Pilih method: SSH
```

### Output
```
═══════════════════════════════════════════════════════════════
  Test Connection
═══════════════════════════════════════════════════════════════

? Choose account › 
  ○ work
  ○ personal
❯ ● newaccount (ACTIVE)
    new@email.com • SSH

⠋ Testing SSH connection...

✗ SSH connection test failed!
Make sure your SSH key is added to GitHub:
1. Copy your public key:
   cat ~/.ssh/id_ed25519_newaccount.pub
2. Add it to GitHub at: https://github.com/settings/keys

Details: Connection failed. Check if SSH key is added to GitHub.

```

## Skenario 3: Test SSH Connection - Key Tidak Ditemukan

### Input
```bash
$ bun run index.ts
# Pilih: Test Connection
# Pilih account: broken
# Pilih method: SSH
```

### Output
```
═══════════════════════════════════════════════════════════════
  Test Connection
═══════════════════════════════════════════════════════════════

? Choose account › 
  ○ work
  ○ personal
❯ ○ broken
    broken@email.com • SSH

✗ SSH key not found: /home/user/.ssh/id_ed25519_broken
Please check your SSH key path configuration.

```

## Skenario 4: Test Token Authentication - Berhasil

### Input
```bash
$ bun run index.ts
# Pilih: Test Connection
# Pilih account: work
# Pilih method: Token
```

### Output
```
═══════════════════════════════════════════════════════════════
  Test Connection
═══════════════════════════════════════════════════════════════

? Choose account › 
❯ ● work (ACTIVE)
    john.doe@company.com • SSH, Token
  ○ personal

? Test which authentication method? › 
  🔑 SSH
❯ 🔐 Token

⠋ Testing token authentication...

✓ Token authentication test passed!
Successfully authenticated as johndoe

Details: HTTP 200 - Authentication successful

```

## Skenario 5: Test Token Authentication - Gagal (Invalid Token)

### Input
```bash
$ bun run index.ts
# Pilih: Test Connection
# Pilih account: expired
# Pilih method: Token
```

### Output
```
═══════════════════════════════════════════════════════════════
  Test Connection
═══════════════════════════════════════════════════════════════

? Choose account › 
  ○ work
❯ ○ expired
    expired@email.com • Token

⠋ Testing token authentication...

✗ Token authentication test failed!
Please check:
• Token has not expired
• Token has correct permissions (repo access)
• Username is correct

Create a new token at: https://github.com/settings/tokens

Details: HTTP 401 - Invalid credentials. Check your username and token.

```

## Skenario 6: Test Token Authentication - Gagal (Insufficient Permissions)

### Input
```bash
$ bun run index.ts
# Pilih: Test Connection
# Pilih account: limited
# Pilih method: Token
```

### Output
```
═══════════════════════════════════════════════════════════════
  Test Connection
═══════════════════════════════════════════════════════════════

? Choose account › 
❯ ○ limited
    limited@email.com • Token

⠋ Testing token authentication...

✗ Token authentication test failed!
Please check:
• Token has not expired
• Token has correct permissions (repo access)
• Username is correct

Create a new token at: https://github.com/settings/tokens

Details: HTTP 403 - Access forbidden. Token may lack required permissions.

```

## Skenario 7: Account Tanpa Authentication Method

### Input
```bash
$ bun run index.ts
# Pilih: Test Connection
# Pilih account: empty
```

### Output
```
═══════════════════════════════════════════════════════════════
  Test Connection
═══════════════════════════════════════════════════════════════

? Choose account › 
  ○ work
  ○ personal
❯ ○ empty
    empty@email.com

✗ Selected account has no authentication methods configured.

```

## Skenario 8: Belum Ada Account

### Input
```bash
$ bun run index.ts
# Pilih: Test Connection
```

### Output
```
═══════════════════════════════════════════════════════════════
  Test Connection
═══════════════════════════════════════════════════════════════

⚠ No accounts configured. Please add an account first.

```

## Tips Troubleshooting

### Untuk SSH Issues:

1. **Cek permissions SSH key:**
   ```bash
   ls -la ~/.ssh/id_ed25519*
   # Private key harus 600 (-rw-------)
   # Public key harus 644 (-rw-r--r--)
   ```

2. **Test manual SSH connection:**
   ```bash
   ssh -T git@github.com
   # Expected output: Hi username! You've successfully authenticated...
   ```

3. **Cek SSH config:**
   ```bash
   cat ~/.ssh/config
   # Pastikan ada entry untuk github.com dengan IdentityFile yang benar
   ```

4. **Generate ulang public key jika hilang:**
   ```bash
   ssh-keygen -y -f ~/.ssh/id_ed25519 > ~/.ssh/id_ed25519.pub
   ```

### Untuk Token Issues:

1. **Cek token validity:**
   ```bash
   curl -u username:token https://api.github.com/user
   # Harus return status 200 dan data user
   ```

2. **Cek token permissions di GitHub:**
   - Buka: https://github.com/settings/tokens
   - Pastikan token memiliki scope `repo` dan `read:user`
   - Cek expiration date

3. **Generate new token:**
   - Buka: https://github.com/settings/tokens/new
   - Pilih scope minimal: `repo`, `read:user`
   - Set expiration sesuai kebutuhan
   - Copy token dan simpan

4. **Test dengan curl:**
   ```bash
   curl -s -o /dev/null -w "%{http_code}" -u username:token https://api.github.com/user
   # Harus return: 200
   ```

## Best Practices

1. **Test setelah setup account baru** - Selalu test connection setelah menambahkan account baru untuk memastikan konfigurasi benar

2. **Regular testing** - Test connection secara berkala untuk memastikan credentials masih valid

3. **Update credentials proaktif** - Jika token akan expired, generate dan update sebelum expired

4. **Keep SSH keys secure** - Jangan share private keys, gunakan passphrase untuk extra security

5. **Backup keys** - Backup SSH keys ke tempat yang aman (encrypted)

6. **Use separate accounts** - Gunakan account berbeda untuk work dan personal untuk better security separation

## Command Reference

```bash
# Start aplikasi
bun run index.ts

# Test installation
bun run test-installation.sh

# Build aplikasi
bun run build.sh

# Publish to npm
bun run publish-npm.sh
```

## Related Documentation

- [README.md](README.md) - Overview aplikasi
- [TEST_CONNECTION_IMPROVEMENTS.md](TEST_CONNECTION_IMPROVEMENTS.md) - Detail technical improvements
- [SETUP_INSTALASI_LENGKAP.md](SETUP_INSTALASI_LENGKAP.md) - Panduan instalasi lengkap