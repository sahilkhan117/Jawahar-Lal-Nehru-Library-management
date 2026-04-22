import fs from 'fs';
import path from 'path';

const pages = [
  // Public
  { role: 'public', name: 'Landing', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzBmMjg2NWFmNmRjNTRhOGQ5MDI0ODZlOGM0MTI5N2FhEgsSBxCzoqH-2BYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTE0NDI2NzM4NjcyMzY1MDQwNA&filename=&opi=96797242' },
  { role: 'public', name: 'Login', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2QxM2MxYzA3MGEyYjQzNDlhYWRjYTk2ODgzMzQyOWIxEgsSBxCzoqH-2BYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTE0NDI2NzM4NjcyMzY1MDQwNA&filename=&opi=96797242' },

  // Student
  { role: 'student', name: 'StudentDashboard', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzdlMDViZWJjNmVjNzRhM2Q4MGFiM2UzYTZiMDgxMDk2EgsSBxCzoqH-2BYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTE0NDI2NzM4NjcyMzY1MDQwNA&filename=&opi=89354086' },
  { role: 'student', name: 'StudentCatalog', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzZhMjQ0MWM5ZjlhYjRkZDc5ZDZlZDVmNzczNGJlNjAxEgsSBxCzoqH-2BYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTE0NDI2NzM4NjcyMzY1MDQwNA&filename=&opi=89354086' },
  { role: 'student', name: 'StudentHistory', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2QwNTdiYzY3YTMxNjQ1MmM4MWNmZjk4NzFhMzU2NTExEgsSBxCzoqH-2BYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTE0NDI2NzM4NjcyMzY1MDQwNA&filename=&opi=89354086' },
  { role: 'student', name: 'StudentProfile', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzU3ODMwNWQ0MzllMjQ4NDViNThmY2RiNmNkNmIyODIyEgsSBxCzoqH-2BYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTE0NDI2NzM4NjcyMzY1MDQwNA&filename=&opi=89354086' },

  // Librarian
  { role: 'librarian', name: 'LibrarianPOS', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2Q0NGE4ZjgxZmJjYzQxMDViNGFjYmUzNDgxODUwZmUzEgsSBxCzoqH-2BYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTE0NDI2NzM4NjcyMzY1MDQwNA&filename=&opi=89354086' },
  { role: 'librarian', name: 'LibrarianStudents', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2I5MDJmNzk3NDVmZjRkM2I5NTY4MmJkZmU0OGNhMjFhEgsSBxCzoqH-2BYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTE0NDI2NzM4NjcyMzY1MDQwNA&filename=&opi=89354086' },
  { role: 'librarian', name: 'LibrarianInventory', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2ZjZmNhNzIzZGJiODQ0OGE4ZTJlMzgxYjY4ODY3M2Y1EgsSBxCzoqH-2BYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTE0NDI2NzM4NjcyMzY1MDQwNA&filename=&opi=89354086' },
  { role: 'librarian', name: 'LibrarianDefaulters', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2QzYjgxZjZmMGUxMjQ2ZTU5YjFmNWFmZjQwYzg2MjU1EgsSBxCzoqH-2BYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTE0NDI2NzM4NjcyMzY1MDQwNA&filename=&opi=89354086' },

  // Admin
  { role: 'admin', name: 'AdminDashboard', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2E4Mzg3ZGI0ZTNhNDQ0MjA5ZGRkMjZjNTNiNTY0NmM2EgsSBxCzoqH-2BYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTE0NDI2NzM4NjcyMzY1MDQwNA&filename=&opi=89354086' },
  { role: 'admin', name: 'AdminComplaints', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzQ0YmU5NjlkN2NmZTQyNTY5ZjkzZjdhYzUwNGQyMzAxEgsSBxCzoqH-2BYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTE0NDI2NzM4NjcyMzY1MDQwNA&filename=&opi=89354086' },
  { role: 'admin', name: 'AdminNotices', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzgyMDllZjUyYjJjZjQ3MWRhMmY3MjlhMGMxZTZiNjk1EgsSBxCzoqH-2BYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTE0NDI2NzM4NjcyMzY1MDQwNA&filename=&opi=89354086' },
  { role: 'admin', name: 'AdminStaff', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2ZjM2RlOTFjM2MyNzRiZWRhMjlmMWJhMGJjNGUxOGExEgsSBxCzoqH-2BYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTE0NDI2NzM4NjcyMzY1MDQwNA&filename=&opi=89354086' },
];

async function run() {
  for (const page of pages) {
    const dir = path.join(process.cwd(), 'src', 'pages', page.role);
    fs.mkdirSync(dir, { recursive: true });

    console.log(`Downloading ${page.name}...`);
    const res = await fetch(page.url);
    let html = await res.text();

    // Extract body content
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let content = bodyMatch ? bodyMatch[1] : html;

    // Extract ONLY the <main> content if it exists (stripping sidebar/header)
    const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (mainMatch) {
      content = mainMatch[1];
    }

    // Remove script tags from the body
    content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Remove HTML comments
    content = content.replace(/<!--[\s\S]*?-->/g, '');

    // Convert class to className
    content = content.replace(/class=/g, 'className=');
    content = content.replace(/for=/g, 'htmlFor=');
    
    // Fix inline styles (strip them for now)
    content = content.replace(/style="[^"]*"/g, '');

    // SVG and common JSX attribute fixes
    const attributeMap = {
      'viewbox': 'viewBox',
      'preserveaspectratio': 'preserveAspectRatio',
      'fill-rule': 'fillRule',
      'clip-rule': 'clipRule',
      'stroke-width': 'strokeWidth',
      'stroke-linecap': 'strokeLinecap',
      'stroke-linejoin': 'strokeLinejoin',
      'stroke-miterlimit': 'strokeMiterlimit',
      'stop-color': 'stopColor',
      'stop-opacity': 'stopOpacity',
      'font-family': 'fontFamily',
      'font-size': 'fontSize',
      'font-weight': 'fontWeight',
      'text-anchor': 'textAnchor',
      'stroke-dasharray': 'strokeDasharray',
      'stroke-dashoffset': 'strokeDashoffset',
      'vector-effect': 'vectorEffect'
    };
    Object.entries(attributeMap).forEach(([attr, jsxAttr]) => {
      content = content.replace(new RegExp(`${attr}=`, 'g'), `${jsxAttr}=`);
    });

    // Fix SVG tag names (camelCase)
    const svgTags = ['linearGradient', 'radialGradient', 'clipPath', 'textPath'];
    svgTags.forEach(tag => {
      content = content.replace(new RegExp(`<${tag.toLowerCase()}([\\s>])`, 'gi'), `<${tag}$1`);
      content = content.replace(new RegExp(`<\/${tag.toLowerCase()}>`, 'gi'), `<\/${tag}>`);
    });

    // Handle self-closing tags correctly
    const selfClosingTags = ['img', 'input', 'hr', 'br', 'area', 'base', 'col', 'embed', 'link', 'meta', 'param', 'source', 'track', 'wbr', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'stop'];
    selfClosingTags.forEach(tag => {
      const regex = new RegExp(`<${tag}(\\s[^>]*?)?>(?!\\s*<\/${tag}>)`, 'gi');
      content = content.replace(regex, (match, attrs) => {
        if (attrs && attrs.trim().endsWith('/')) return match;
        return `<${tag}${attrs || ''} />`;
      });
    });

    // Robust Icon Replacement: Material Symbols to React Icons
    const iconMap = {
      'dashboard': 'MdDashboard',
      'menu': 'MdMenu',
      'search': 'MdSearch',
      'notifications': 'MdNotifications',
      'help': 'MdHelpOutline',
      'help_outline': 'MdHelpOutline',
      'person': 'MdPerson',
      'library_books': 'MdLibraryBooks',
      'history': 'MdHistory',
      'payments': 'MdPayments',
      'logout': 'MdLogout',
      'settings': 'MdSettings',
      'groups': 'MdGroups',
      'inventory_2': 'MdInventory2',
      'school': 'MdSchool',
      'badge': 'MdBadge',
      'check_circle': 'MdCheckCircle',
      'verified': 'MdVerified',
      'download': 'MdDownload',
      'warning': 'MdWarning',
      'sync': 'MdSync',
      'dns': 'MdDns',
      'trending_up': 'MdTrendingUp',
      'trending_down': 'MdTrendingDown',
      'trending_flat': 'MdTrendingFlat',
      'account_balance_wallet': 'MdAccountBalanceWallet',
      'auto_stories': 'MdAutoStories',
      'event': 'MdEvent',
      'event_upcoming': 'MdEvent',
      'point_of_sale': 'MdPointOfSale',
      'arrow_forward': 'MdArrowForward',
      'swap_horiz': 'MdSwapHoriz',
      'keyboard_return': 'MdKeyboardReturn',
      'workspace_premium': 'MdWorkspacePremium',
      'local_library': 'MdLocalLibrary',
      'meeting_room': 'MdMeetingRoom',
      'calendar_today': 'MdCalendarToday',
      'local_police': 'MdSecurity',
      'book': 'MdBook',
      'menu_book': 'MdBook',
      'history_toggle_off': 'MdHistoryToggleOff',
      'headphones': 'MdHeadphones',
      'tablet_mac': 'MdTabletMac',
      'hourglass_empty': 'MdHourglassEmpty',
      'speed': 'MdSpeed',
      'verified_user': 'MdVerifiedUser',
      'account_balance': 'MdAccountBalance',
      'lock': 'MdLock',
      'cloud_upload': 'MdCloudUpload',
      'group': 'MdGroups',
      'filter_list': 'MdFilterList',
      'sort': 'MdSort',
      'chevron_left': 'MdChevronLeft',
      'chevron_right': 'MdChevronRight',
      'database': 'MdStorage',
      'star': 'MdStar',
      'category': 'MdCategory',
      'add': 'MdAdd',
      'edit': 'MdEdit',
      'delete': 'MdDelete',
      'close': 'MdClose',
      'error': 'MdError',
      'info': 'MdInfo',
      'mail': 'MdMail',
      'phone': 'MdPhone',
      'location_on': 'MdLocationOn',
      'people': 'MdPeople',
      'inventory': 'MdInventory',
      'report': 'MdReport',
      'campaign': 'MdCampaign',
      'assignment': 'MdAssignment',
      'manage_accounts': 'MdManageAccounts',
      'signal_cellular_4_bar': 'MdSignalCellular4Bar',
      'wifi': 'MdWifi',
      'battery_full': 'MdBatteryFull',
      'format_bold': 'MdFormatBold',
      'format_italic': 'MdFormatItalic',
      'format_underlined': 'MdFormatUnderlined',
      'format_list_bulleted': 'MdFormatListBulleted',
      'format_list_numbered': 'MdFormatListNumbered',
      'link': 'MdLink',
      'image': 'MdImage',
      'send': 'MdSend'
    };

    let mdIconsToImport = new Set();
    
    // Improved Regex to catch material-symbols spans with any attributes
    let jsx = content.replace(/<span[^>]*material-symbols-outlined[^>]*>([\s\S]*?)<\/span>/gi, (match, innerContent) => {
      // Get icon name from inner content or data-icon attribute
      let iconName = innerContent.trim();
      if (!iconName || iconName.includes('<')) { // If inner content has tags, try data-icon
        const dataIconMatch = match.match(/data-icon=["']([^"']+)["']/);
        if (dataIconMatch) iconName = dataIconMatch[1];
      }
      
      // Final fallback: if innerContent still has tags, it might be a nested structure, just keep it or try to clean it
      if (!iconName || iconName.includes('<')) return match;

      const componentName = iconMap[iconName] || `Md${iconName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`;
      mdIconsToImport.add(componentName);

      // Extract original classes to preserve styling
      const classMatch = match.match(/className=["']([^"']+)["']/);
      let classes = classMatch ? classMatch[1].replace('material-symbols-outlined', '').trim() : '';
      
      return `<${componentName} className="${classes}" />`;
    });

    // Replace any remaining material-symbols-outlined text references
    jsx = jsx.replace(/material-symbols-outlined/g, 'react-icons-md');

    const imports = `import React from 'react';\nimport { ${Array.from(mdIconsToImport).join(', ')} } from 'react-icons/md';\n\n`;
    const finalJsx = `${imports}export default function ${page.name}() {\n  return (\n    <div className="space-y-card-gap">\n      ${jsx}\n    </div>\n  );\n}\n`;

    const filepath = path.join(dir, `${page.name}.jsx`);
    fs.writeFileSync(filepath, finalJsx);
    console.log(`Created ${filepath}`);
  }
}

run().catch(console.error);
